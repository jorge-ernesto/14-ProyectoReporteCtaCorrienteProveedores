/**
 * @NApiVersion 2.1
 */
define(['./Lib.Basic', './Lib.Search', './Lib.Process', './Lib.Helper', 'N'],

    function (Basic, Search, Process, Helper, N) {

        function agruparCtaCorrProv(dataCtaCorrProv) {

            // Obtener data en formato agrupado
            let dataAgrupada = {}; // * Audit: Util, manejo de JSON

            dataCtaCorrProv.forEach(element => {

                // Obtener variables
                let proveedor_ruc = element.proveedor.ruc;
                let proveedor_nombre = element.proveedor.nombre;
                let proveedor = proveedor_ruc.trim() + ' - ' + proveedor_nombre.trim();
                let moneda = element.moneda.nombre;

                // Agrupar data
                dataAgrupada['proveedores'] = dataAgrupada['proveedores'] || {};
                dataAgrupada['proveedores'][proveedor] = dataAgrupada['proveedores'][proveedor] || {};
                dataAgrupada['proveedores'][proveedor]['totales'] = dataAgrupada['proveedores'][proveedor]['totales'] || {};
                dataAgrupada['proveedores'][proveedor]['detalle'] = dataAgrupada['proveedores'][proveedor]['detalle'] || [];
                dataAgrupada['proveedores'][proveedor]['totales'][moneda] = dataAgrupada['proveedores'][proveedor]['totales'][moneda] || {};
                dataAgrupada['proveedores'][proveedor]['totales'][moneda]['importe_bruto_me'] = dataAgrupada['proveedores'][proveedor]['totales'][moneda]['importe_bruto_me'] || 0;
                dataAgrupada['proveedores'][proveedor]['totales'][moneda]['importe_pagado_me'] = dataAgrupada['proveedores'][proveedor]['totales'][moneda]['importe_pagado_me'] || 0;
                dataAgrupada['proveedores'][proveedor]['totales'][moneda]['importe_saldo_me'] = dataAgrupada['proveedores'][proveedor]['totales'][moneda]['importe_saldo_me'] || 0;
                // Agrupara data
                dataAgrupada['totales'] = dataAgrupada['totales'] || {};
                dataAgrupada['totales'][moneda] = dataAgrupada['totales'][moneda] || {};
                dataAgrupada['totales'][moneda]['importe_bruto_me'] = dataAgrupada['totales'][moneda]['importe_bruto_me'] || 0;
                dataAgrupada['totales'][moneda]['importe_pagado_me'] = dataAgrupada['totales'][moneda]['importe_pagado_me'] || 0;
                dataAgrupada['totales'][moneda]['importe_saldo_me'] = dataAgrupada['totales'][moneda]['importe_saldo_me'] || 0;

                // totales por proveedor
                dataAgrupada['proveedores'][proveedor]['totales'][moneda]['importe_bruto_me'] += parseFloat(element.importe_bruto_me);
                dataAgrupada['proveedores'][proveedor]['totales'][moneda]['importe_pagado_me'] += parseFloat(element.importe_pagado_me);
                dataAgrupada['proveedores'][proveedor]['totales'][moneda]['importe_saldo_me'] += parseFloat(element.importe_saldo_me);

                // detalle por proveedor
                dataAgrupada['proveedores'][proveedor]['detalle'].push(element);

                // totales generales
                dataAgrupada['totales'][moneda]['importe_bruto_me'] += parseFloat(element.importe_bruto_me);
                dataAgrupada['totales'][moneda]['importe_pagado_me'] += parseFloat(element.importe_pagado_me);
                dataAgrupada['totales'][moneda]['importe_saldo_me'] += parseFloat(element.importe_saldo_me);

                // Otra forma
                // dataAgrupada[proveedor_ruc] ??= [];
                // dataAgrupada[proveedor_ruc] = element;
            });

            return dataAgrupada;
        }

        function getDataCtaCorrProv_Completo(dataCtaCorrProv, dataCtaCorrProv_Detracciones, balance) {

            // Procesar reporte

            // Formatear tipos de datos
            dataCtaCorrProv.forEach((value, key) => {
                dataCtaCorrProv[key]['importe_bruto_me'] = parseFloat(value['importe_bruto_me']);
                dataCtaCorrProv[key]['importe_pagado_me'] = parseFloat(value['importe_pagado_me']);
                dataCtaCorrProv[key]['ns_porcentaje_detraccion'] = !isNaN(parseFloat(value['ns_porcentaje_detraccion'])) ? parseFloat(value['ns_porcentaje_detraccion']) : value['ns_porcentaje_detraccion'];
            });
            dataCtaCorrProv_Detracciones.forEach((value, key) => {
                dataCtaCorrProv_Detracciones[key]['importe_bruto_me'] = parseFloat(value['importe_bruto_me']);
            });

            // Agregar JSON vacios
            dataCtaCorrProv.forEach((valueCCP, keyCCP) => {
                dataCtaCorrProv[keyCCP]['pagos'] = dataCtaCorrProv[keyCCP]['pagos'] || {};
                dataCtaCorrProv[keyCCP]['pagos']['detracciones'] = dataCtaCorrProv[keyCCP]['pagos']['detracciones'] || [];
                dataCtaCorrProv[keyCCP]['cuentas_contables'] = dataCtaCorrProv[keyCCP]['cuentas_contables'] || {};
                dataCtaCorrProv[keyCCP]['cuentas_contables']['42219111_detracciones'] = dataCtaCorrProv[keyCCP]['cuentas_contables']['42219111_detracciones'] || [];
            });

            /****************** DETRACCIONES ******************/
            // Recorrer documentos
            dataCtaCorrProv.forEach((valueCCP, keyCCP) => {

                // Declarar variables
                dataCtaCorrProv[keyCCP]['es_detraccion'] = 'F';

                // Recorrer documentos con detracciones
                dataCtaCorrProv_Detracciones.forEach((valueCCPD, keyCCPD) => {

                    // Validar los ID interno
                    if (valueCCP.id_interno == valueCCPD.id_interno) {

                        // Validar que tenga detraccion
                        // En la busqueda filtramos por la cuenta 42219111 que es la cuenta de detracciones
                        // Esto es un flag adicional, ademas nos sirve para obtener un unico importe referente a la detraccion
                        if (valueCCPD.custcol_4601_witaxline == 'T') {

                            // Agregar data de detracciones
                            dataCtaCorrProv[keyCCP]['pagos']['detracciones'].push({
                                numero_documento: valueCCPD.numero_documento,
                                importe_detraccion_me: valueCCPD.importe_bruto_me
                            })
                            dataCtaCorrProv[keyCCP]['es_detraccion'] = 'T';
                        }
                    }
                });
            });

            // Recorrer documentos
            dataCtaCorrProv.forEach((valueCCP, keyCCP) => {

                // Declarar variables
                dataCtaCorrProv[keyCCP]['es_autodetraccion'] = 'F';
                let importe_total_cuenta_detracciones = 0;

                // Recorrer documentos con detracciones
                dataCtaCorrProv_Detracciones.forEach((valueCCPD, keyCCPD) => {

                    // Validar los ID interno
                    if (valueCCP.id_interno == valueCCPD.id_interno) {

                        // Validar que tenga detraccion
                        if (valueCCP.es_detraccion == 'T') {

                            // Agregar data de detracciones
                            dataCtaCorrProv[keyCCP]['cuentas_contables']['42219111_detracciones'].push({
                                numero_documento: valueCCPD.numero_documento,
                                importe_detraccion_me: valueCCPD.importe_bruto_me
                            })

                            // Verificar si es autodetraccion
                            importe_total_cuenta_detracciones += valueCCPD.importe_bruto_me;
                            if (importe_total_cuenta_detracciones == 0) {
                                dataCtaCorrProv[keyCCP]['es_autodetraccion'] = 'T';
                            }
                        }
                    }
                });
            });

            // Actualizar data
            dataCtaCorrProv.forEach((value, key) => {

                // Actualizar Facturas de compra con detracciones
                let importe_detraccion = value['pagos']['detracciones'][0]?.['importe_detraccion_me'] || 0;

                if (value.tipo.codigo == 'VendBill') { // Es Factura de compra

                    if (value.ns_porcentaje_detraccion > 0) { // Tiene aplicada detraccion

                        if (value.es_autodetraccion == 'F') { // No es autodetraccion

                            dataCtaCorrProv[key]['importe_bruto_me'] = value['importe_bruto_me'] + importe_detraccion;

                            if (value.ns_numero_detraccion) { // Tiene detraccion pagada

                                dataCtaCorrProv[key]['importe_pagado_me'] = value['importe_pagado_me'] + importe_detraccion;
                            }
                        }
                    }
                }
            });

            // Obtener saldo pendiente
            dataCtaCorrProv.forEach((value, key) => {
                if (value.tipo.codigo == 'VendBill' || value.tipo.codigo == 'Custom122') {
                    dataCtaCorrProv[key]['importe_saldo_me'] = value['importe_bruto_me'] - value['importe_pagado_me'];
                } else if (value.tipo.codigo == 'VendCred') {
                    dataCtaCorrProv[key]['importe_saldo_me'] = value['importe_bruto_me'] + value['importe_pagado_me'];
                }
            });

            // Filtrar por saldo pendiente
            let dataCtaCorrProv_ = [];
            if (balance) {
                dataCtaCorrProv.forEach((value, key) => {
                    if (value.tipo.codigo == 'VendBill' || value.tipo.codigo == 'Custom122') {
                        if (balance == 'balancePendiente' && value.importe_saldo_me > 0) {
                            dataCtaCorrProv_.push(value);
                        } else if (balance == 'balanceCero' && value.importe_saldo_me <= 0) {
                            dataCtaCorrProv_.push(value);
                        }
                    } else if (value.tipo.codigo == 'VendCred') {
                        if (balance == 'balancePendiente' && value.importe_saldo_me < 0) {
                            dataCtaCorrProv_.push(value);
                        } else if (balance == 'balanceCero' && value.importe_saldo_me >= 0) {
                            dataCtaCorrProv_.push(value);
                        }
                    }
                });
            } else {
                dataCtaCorrProv_ = dataCtaCorrProv;
            }

            // Agrupar data
            let dataCtaCorrProv_Agrupada = agruparCtaCorrProv(dataCtaCorrProv_);

            return dataCtaCorrProv_Agrupada;
        }

        function getReporteFreeMarker(dataReporte) {

            // Convertir valores nulos en un objeto JavaScript a string - Al parecer FreeMarker no acepta valores nulos
            // dataReporte = Helper.convertObjectValuesToStrings(dataReporte);

            return dataReporte;
        }

        return { getDataCtaCorrProv_Completo, getReporteFreeMarker }

    });
