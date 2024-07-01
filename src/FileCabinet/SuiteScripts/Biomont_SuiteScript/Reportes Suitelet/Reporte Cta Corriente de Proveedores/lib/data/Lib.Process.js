/**
 * @NApiVersion 2.1
 */
define(['./Lib.Basic', './Lib.Search', './Lib.Process', './Lib.Helper', 'N'],

    function (Basic, Search, Process, Helper, N) {

        /**
         * Tipos de documentos
         *
         * VendBill  : Factura de Compra
         * Custom122 : Letras por Pagar
         * VendCred  : Crédito de Factura
         */

        /**
         * Tipos de documentos - pagos
         *
         * Custom121 : Comprobante de Retencion
         * Custom122 : Letras por Pagar
         * FxReval   : Revaluación de moneda
         * Journal   : Diario
         * VendCred  : Crédito de factura
         * VendPymt  : Pago de factura
         * VPrepApp  : Solicitud de pagos anticipados de proveedores
         * Deposit   : Deposito
         */

        /******************/

        function getDataRegRel_Completo(dataPagosRegRel, dataPagosRegRel_Detalle) {

            // Recorrer registros relacionados
            dataPagosRegRel.forEach((value_RR, key_RR) => {

                // Recorrer registros relacionados detalle
                dataPagosRegRel_Detalle.forEach((value_RR_DET, key_RR_DET) => {

                    // Igualar los ID interno
                    if (value_RR.regrel_id_interno == value_RR_DET.regrel_id_interno) {

                        let tipo_codigo = value_RR.tipo.codigo;
                        let regrel_tipo_codigo = value_RR_DET.regrel_tipo.codigo;

                        // Documento: Factura de Compra
                        if (tipo_codigo == 'VendBill') {

                            if (regrel_tipo_codigo == 'Journal') { // Pago: Diario

                                // Cabecera
                                if (value_RR_DET.regrel_mainline == '*') {
                                    if (value_RR.id_interno == value_RR_DET.aplicado_transaccion_id_interno) {
                                        if (value_RR_DET.aplicado_vinculo_importe_me) {
                                            dataPagosRegRel[key_RR]['regrel_pago'] += parseFloat(value_RR_DET.aplicado_vinculo_importe_me);
                                        }
                                    }
                                }
                            } else if (regrel_tipo_codigo == 'Custom121') { // Pago: Comprobante de Retencion

                                // Cabecera
                                if (value_RR_DET.regrel_mainline == '*') {
                                    if (value_RR.id_interno == value_RR_DET.aplicado_transaccion_id_interno) {
                                        if (value_RR_DET.aplicado_vinculo_importe_me) {
                                            dataPagosRegRel[key_RR]['regrel_pago'] += parseFloat(value_RR_DET.aplicado_vinculo_importe_me);
                                        }
                                    }
                                }
                            } else if (regrel_tipo_codigo == 'VendCred' || regrel_tipo_codigo == 'Custom122') { // Pago: Crédito de factura, Letra por Pagar

                                // Cabecera
                                if (value_RR_DET.regrel_mainline == '*') {
                                    if (value_RR_DET.banco.id) {
                                        dataPagosRegRel[key_RR]['regrel_banco'] = value_RR_DET.banco;
                                    }
                                    if (value_RR.id_interno == value_RR_DET.aplicado_transaccion_id_interno) {
                                        if (value_RR_DET.aplicado_vinculo_importe_me) {
                                            dataPagosRegRel[key_RR]['regrel_pago'] += parseFloat(value_RR_DET.aplicado_vinculo_importe_me);
                                        }
                                    }
                                }
                            } else if (regrel_tipo_codigo == 'VendPymt' || regrel_tipo_codigo == 'VPrepApp') { // Pago: Pago de factura, Solicitud de pagos anticipados de proveedores

                                // Cabecera
                                if (value_RR_DET.regrel_mainline == '*') {
                                    if (value_RR_DET.banco.id) {
                                        dataPagosRegRel[key_RR]['regrel_banco'] = value_RR_DET.banco;
                                    }
                                }

                                // Detalle
                                if (value_RR.id_interno == value_RR_DET.aplicado_transaccion_id_interno) {
                                    if (value_RR_DET.aplicado_vinculo_importe_me) {
                                        dataPagosRegRel[key_RR]['regrel_pago'] += parseFloat(value_RR_DET.aplicado_vinculo_importe_me);
                                    }
                                }
                            }
                        }

                        // Documento: Crédito de Factura
                        if (tipo_codigo == 'VendCred') {

                            if (regrel_tipo_codigo == 'VendBill' || regrel_tipo_codigo == 'Journal') { // Pago: Factura de Compra, Diario

                                // Cabecera
                                if (value_RR_DET.regrel_mainline == '*') {
                                    if (value_RR.importe_pagado_me) {
                                        dataPagosRegRel[key_RR]['regrel_pago'] = parseFloat(value_RR.importe_pagado_me);
                                    }
                                }
                            }
                        }
                    }
                });
            });

            return dataPagosRegRel;
        }

        function getDataCtaCorPro_Completo(dataCtaCorPro, dataRegRel_Completo, dataDetracciones, dataDiariosDetracciones, dataPagosFacturas, balance) {

            // Procesar reporte
            // Formatear tipos de datos
            // ...

            // Agregar arreglos vacios / Agregar JSON vacios
            dataCtaCorPro.forEach((value, key) => {
                dataCtaCorPro[key]['pagos_registros_relacionados'] = dataCtaCorPro[key]['pagos_registros_relacionados'] || [];
                dataCtaCorPro[key]['pagos_detraccion'] = dataCtaCorPro[key]['pagos_detraccion'] || {};
                dataCtaCorPro[key]['pagos_letrasxpagar'] = dataCtaCorPro[key]['pagos_letrasxpagar'] || [];
            });

            /****************** PAGOS - REGISTROS RELACIONADOS ******************/
            if (Object.keys(dataRegRel_Completo).length > 0) {

                // Recorrer documentos
                dataCtaCorPro.forEach((value_CCP, key_CCP) => {

                    // Es Factura de compra, Crédito de factura
                    if (value_CCP.tipo.codigo == 'VendBill' || value_CCP.tipo.codigo == 'VendCred') {

                        // Recorrer registros relacionados
                        dataRegRel_Completo.forEach((value_RR, key_RR) => {

                            // Igualar los ID interno
                            if (value_CCP.id_interno == value_RR.id_interno) {

                                // Agregar data de registros relacionados
                                dataCtaCorPro[key_CCP]['pagos_registros_relacionados'].push({
                                    id_interno: value_RR.regrel_id_interno,
                                    banco: value_RR.regrel_banco,
                                    tipo: value_RR.regrel_tipo,
                                    ns_tipo_documento: value_RR.regrel_ns_tipo_documento,
                                    numero_documento: value_RR.regrel_numero_documento,
                                    numero_transaccion: value_RR.regrel_numero_transaccion,
                                    fecha: value_RR.regrel_fecha,
                                    pago: value_RR.regrel_pago
                                });
                            }
                        });
                    }
                });
            }

            /****************** PAGOS - DETRACCIONES ******************/
            if (Object.keys(dataDetracciones).length > 0) {

                // Recorrer documentos
                dataCtaCorPro.forEach((value_CCP, key_CCP) => {

                    // Es Factura de compra
                    if (value_CCP.tipo.codigo == 'VendBill') {

                        // Es detraccion
                        if (value_CCP.pagos_detraccion.es_detraccion == 'T') {

                            // Declarar variables
                            let importe_total_cuenta_detracciones = 0;

                            // Recorrer documentos con detracciones
                            dataDetracciones.forEach((value_PD, key_PD) => {

                                // Igualar los ID interno
                                if (value_CCP.id_interno == value_PD.id_interno) {

                                    importe_total_cuenta_detracciones += value_PD.importe_bruto_me;

                                    // En la busqueda filtramos por la cuenta 42219111 que es la cuenta de detracciones
                                    // custcol_4601_witaxline es un flag adicional, ademas nos sirve para obtener un unico importe referente a la detraccion
                                    if (value_PD.custcol_4601_witaxline == 'T') {

                                        // Agregar data de detraccion
                                        dataCtaCorPro[key_CCP]['pagos_detraccion']['pago'] += value_PD.importe_bruto_me;
                                    }
                                }
                            });

                            // Es autodetraccion
                            if (importe_total_cuenta_detracciones == 0) dataCtaCorPro[key_CCP]['pagos_detraccion']['es_autodetraccion'] = 'T';
                        }
                    }
                });
            }

            if (Object.keys(dataDiariosDetracciones).length > 0) {

                // Recorrer documentos
                dataCtaCorPro.forEach((value_CCP, key_CCP) => {

                    // Es Factura de compra
                    if (value_CCP.tipo.codigo == 'VendBill') {

                        // Es detraccion
                        if (value_CCP.pagos_detraccion.es_detraccion == 'T') {

                            // Recorrer diarios con detracciones
                            dataDiariosDetracciones.forEach((value_DD, key_DD) => {

                                // Igualar los ID interno
                                if (value_CCP.id_interno == value_DD.ns_factura_detraccion_id_interno) {

                                    dataCtaCorPro[key_CCP]['pagos_detraccion']['tipo'] = value_DD.tipo;
                                    dataCtaCorPro[key_CCP]['pagos_detraccion']['numero_documento'] = value_DD.numero_documento;
                                    dataCtaCorPro[key_CCP]['pagos_detraccion']['banco'] = getBanco(dataDiariosDetracciones, value_DD.id_interno);
                                }
                            });
                        }
                    }
                });
            }

            /****************** PAGOS - LETRAS POR PAGAR ******************/
            if (Object.keys(dataPagosFacturas).length > 0) {

                // Recorrer documentos
                dataCtaCorPro.forEach((value_CCP, key_CCP) => {

                    // Es Factura de compra
                    if (value_CCP.tipo.codigo == 'Custom122') {

                        // Recorrer diarios con detracciones
                        dataPagosFacturas.forEach((value_PF, key_PF) => {

                            // Igualar los ID interno
                            if (value_CCP.id_interno == value_PF.aplicado_transaccion_id_interno) {

                                dataCtaCorPro[key_CCP]['pagos_letrasxpagar'].push({
                                    id_interno: value_PF.id_interno,
                                    banco: getBanco(dataPagosFacturas, value_PF.id_interno),
                                    tipo: value_PF.tipo,
                                    ns_tipo_documento: '',
                                    numero_documento: value_PF.numero_documento,
                                    numero_transaccion: value_PF.numero_transaccion,
                                    fecha: value_PF.fecha,
                                    pago: value_PF.importe_debito_me
                                });
                            }
                        });
                    }
                });
            }

            /****************** ACTUALIZAR DATA ******************/
            // Actualizar importe bruto e importe pagado
            dataCtaCorPro.forEach((value_CCP, key_CCP) => {

                // Es Factura de compra
                if (value_CCP.tipo.codigo == 'VendBill') {

                    // Es detraccion y no es autodetraccion
                    if (value_CCP.pagos_detraccion.es_detraccion == 'T' && value_CCP.pagos_detraccion.es_autodetraccion == 'F') {

                        let importe_detraccion_me = value_CCP['pagos_detraccion']['pago'] || 0;

                        // Actualizar importe bruto
                        dataCtaCorPro[key_CCP]['importe_bruto_me'] = value_CCP['importe_bruto_me'] + importe_detraccion_me;

                        // Tiene detraccion pagada
                        if (value_CCP.pagos_detraccion.ns_numero_detraccion) {

                            // Actualizar importe pagado
                            dataCtaCorPro[key_CCP]['importe_pagado_me'] = value_CCP['importe_pagado_me'] + importe_detraccion_me;
                        }
                    }
                }
            });

            /****************** OBTENER DATA ******************/
            // Obtener saldo pendiente
            dataCtaCorPro.forEach((value, key) => {
                if (value.tipo.codigo == 'VendBill' || value.tipo.codigo == 'Custom122') {
                    dataCtaCorPro[key]['importe_saldo_me'] = value['importe_bruto_me'] - value['importe_pagado_me'];
                } else if (value.tipo.codigo == 'VendCred') {
                    dataCtaCorPro[key]['importe_saldo_me'] = value['importe_bruto_me'] + value['importe_pagado_me'];
                }
            });

            /****************** FILTRO ******************/
            // Filtrar por saldo pendiente
            let dataCtaCorPro_ = [];
            if (balance) {
                dataCtaCorPro.forEach((value, key) => {
                    if (value.tipo.codigo == 'VendBill' || value.tipo.codigo == 'Custom122') {
                        if (balance == 'balancePendiente' && value.importe_saldo_me > 0) {
                            dataCtaCorPro_.push(value);
                        } else if (balance == 'balanceCero' && value.importe_saldo_me <= 0) {
                            dataCtaCorPro_.push(value);
                        }
                    } else if (value.tipo.codigo == 'VendCred') {
                        if (balance == 'balancePendiente' && value.importe_saldo_me < 0) {
                            dataCtaCorPro_.push(value);
                        } else if (balance == 'balanceCero' && value.importe_saldo_me >= 0) {
                            dataCtaCorPro_.push(value);
                        }
                    }
                });
            } else {
                dataCtaCorPro_ = dataCtaCorPro;
            }

            // Helper.error_log('getDataPagosRegRel_Completo', dataCtaCorPro_);
            return dataCtaCorPro_;
        }

        function getBanco(dataDocumentos, idInterno) {

            // Helper.error_log('', { dataDocumentos, idInterno });

            let banco = { id: '', nombre: '' };

            dataDocumentos.some((value, key) => {

                if (value.id_interno == idInterno) {

                    if (value.banco.id) {

                        // Salir del bucle al encontrar una condición verdadera
                        banco = value.banco;
                        return true;
                    }
                }
            });

            return banco;
        }

        function agruparCtaCorPro(dataCtaCorPro) {

            // Obtener data en formato agrupado
            let dataAgrupada = {}; // * Audit: Util, manejo de JSON

            dataCtaCorPro.forEach(element => {

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

        function getReporteFreeMarker(dataReporte) {

            // Convertir valores nulos en un objeto JavaScript a string - Al parecer FreeMarker no acepta valores nulos
            // dataReporte = Helper.convertObjectValuesToStrings(dataReporte);

            return dataReporte;
        }

        return { getDataRegRel_Completo, getDataCtaCorPro_Completo, agruparCtaCorPro, getReporteFreeMarker }

    });
