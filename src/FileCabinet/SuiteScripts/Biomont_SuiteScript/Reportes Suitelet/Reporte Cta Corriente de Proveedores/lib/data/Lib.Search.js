/**
 * @NApiVersion 2.1
 */
define(['./Lib.Basic', './Lib.Helper', 'N'],

    function (Basic, Helper, N) {

        const { search } = N;

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

        /****************** Listado de documentos (VendBill, Custom122, VendCred) ******************/

        function getDataCtaCorPro(params) {

            // Declarar variables
            let resultTransaction = [];

            // Declarar search
            // Agregar tipo
            let transactionQuery = new Basic.CustomSearch('transaction');

            // Agregar columnas
            transactionQuery.pushColumn({ name: "internalid", label: "Internal ID" });
            transactionQuery.pushColumn({
                name: "number",
                join: "account",
                // sort: search.Sort.ASC,
                label: "CUENTA (NUMERO)"
            });
            transactionQuery.pushColumn({
                name: "description",
                join: "account",
                label: "CUENTA (DESCRIPCION)"
            });
            transactionQuery.pushColumn({
                name: "vatregnumber",
                join: "vendorLine",
                label: "RUC"
            });
            transactionQuery.pushColumn({ name: "entity", label: "PROVEEDOR" });
            transactionQuery.pushColumn({ name: "datecreated", label: "FECHA DE REGISTRO" });
            transactionQuery.pushColumn({
                name: "trandate",
                // sort: search.Sort.ASC,
                label: "FECHA DE EMISION"
            });
            transactionQuery.pushColumn({
                name: "formuladate",
                formula: "NVL({duedate}, {custbody_ns_lt_fech_venc})",
                sort: search.Sort.ASC,
                label: "FECHA DE VENCIMIENTO"
            });
            transactionQuery.pushColumn({ name: "typecode", label: "Código de tipo" });
            transactionQuery.pushColumn({ name: "type", label: "Tipo" });
            transactionQuery.pushColumn({ name: "custbody_ns_document_type", label: "NS Tipo de Documento" });
            transactionQuery.pushColumn({ name: "tranid", label: "Número de documento" });
            transactionQuery.pushColumn({
                name: "currency",
                sort: search.Sort.ASC,
                label: "Moneda"
            });
            transactionQuery.pushColumn({ name: "fxgrossamount", label: "Importe bruto (moneda extranjera)" });
            transactionQuery.pushColumn({ name: "fxamountpaid", label: "Importe pagado (moneda extranjera)" });
            transactionQuery.pushColumn({ name: "statusref", label: "Estado" });
            transactionQuery.pushColumn({ name: "custbody_ns_perce_detrac", label: "NS Porcentaje DET/RET" });
            transactionQuery.pushColumn({ name: "custbody_ns_detraccion_number", label: "NS Num. Deposito Detraccion" });
            transactionQuery.pushColumn({ name: "custbody_ns_detraccion_date", label: "NS Fecha Dep. Detraccion" });

            // Agregar filtros
            addFiltersCtaCorrProv(transactionQuery, params, 'search_ctaCorrProv');

            // Cantidad de registros en search
            // transactionQuery.addSetting('count', true);

            // Buscar por indice o label en busqueda
            transactionQuery.addSetting('type', 'indice');

            // Crear y recorrer search
            transactionQuery.execute(node => {

                let id_interno = node.getValue(0);
                let cuenta_numero = node.getValue(1);
                let cuenta_descripcion = node.getValue(2);
                let proveedor_ruc = node.getValue(3);
                let proveedor_id_interno = node.getValue(4);
                let proveedor_nombre = node.getText(4);
                let fecha_registro = node.getValue(5);
                let fecha_emision = node.getValue(6);
                let fecha_vencimiento = node.getValue(7);
                let tipo_codigo = node.getValue(8);
                let tipo = node.getValue(9);
                let tipo_nombre = node.getText(9);
                let ns_tipo_documento = node.getValue(10);
                let ns_tipo_documento_nombre = node.getText(10);
                let numero_documento = node.getValue(11);
                let moneda = node.getValue(12);
                let moneda_nombre = node.getText(12);
                let importe_bruto_me = node.getValue(13); // Importe bruto (moneda extranjera)
                let importe_pagado_me = node.getValue(14); // Importe pagado (moneda extranjera)
                let estado = node.getText(15); // Estado
                // Detracción
                let ns_porcentaje_detraccion = node.getValue(16); // NS Porcentaje DET/RET
                let ns_numero_detraccion = node.getValue(17); // NS Num. Deposito Detraccion
                let ns_fecha_detraccion = node.getValue(18); // NS Fecha Dep. Detraccion
                let es_detraccion = 'F';
                let es_autodetraccion = 'F';

                // Procesar informacion
                importe_bruto_me = parseFloat(importe_bruto_me);
                importe_pagado_me = parseFloat(importe_pagado_me);

                // Procesar informacion - Detraccion
                ns_porcentaje_detraccion = !isNaN(parseFloat(ns_porcentaje_detraccion)) ? parseFloat(ns_porcentaje_detraccion) : ns_porcentaje_detraccion;
                es_detraccion = (ns_porcentaje_detraccion > 0) ? 'T' : 'F';

                resultTransaction.push({
                    id_interno: id_interno,
                    cuenta: { numero: cuenta_numero, descripcion: cuenta_descripcion },
                    proveedor: { ruc: proveedor_ruc, id_interno: proveedor_id_interno, nombre: proveedor_nombre },
                    fecha_registro: fecha_registro,
                    fecha_emision: fecha_emision,
                    fecha_vencimiento: fecha_vencimiento,
                    tipo: { codigo: tipo_codigo, id: tipo, nombre: tipo_nombre },
                    ns_tipo_documento: { id: ns_tipo_documento, nombre: ns_tipo_documento_nombre },
                    numero_documento: numero_documento,
                    moneda: { id: moneda, nombre: moneda_nombre },
                    importe_bruto_me: importe_bruto_me,
                    importe_pagado_me: importe_pagado_me,
                    estado: estado,
                    // Detracción
                    pagos_detraccion: {
                        // Datos
                        ns_porcentaje_detraccion: ns_porcentaje_detraccion,
                        ns_numero_detraccion: ns_numero_detraccion,
                        ns_fecha_detraccion: ns_fecha_detraccion,
                        es_detraccion: es_detraccion,
                        es_autodetraccion: es_autodetraccion,
                        // Otros
                        banco: {},
                        tipo: {},
                        numero_documento: '',
                        fecha: ns_fecha_detraccion,
                        pago: 0
                    }
                });
            });

            // Helper.error_log('getDataCtaCorPro', resultTransaction);
            return resultTransaction;
        }

        function addFiltersCtaCorrProv(transactionQuery, params, search) {

            // Obtener parametros
            let { subsidiary, dateFrom, dateTo, vendor, ruc, currency, type, status } = params;

            // Agregar filtros
            let filters = [];

            if (search == 'search_ctaCorrProv') {
                filters = [
                    ["subsidiary", "anyof", subsidiary],
                    "AND",
                    ["mainline", "is", "T"],
                    "AND",
                    [
                        [["type", "anyof", "VendBill"], "AND", ["account.number", "startswith", "42"]], "OR",
                        [["type", "anyof", "Custom122"], "AND", ["account.number", "startswith", "42"], "AND", ["creditamount", "greaterthan", "0.00"]], "OR",
                        [["type", "anyof", "VendCred"]]
                    ],
                    "AND",
                    ["grossamount", "notequalto", "0.00"],
                    "AND",
                    ["trandate", "within", dateFrom, dateTo]
                ]
            } else if (search = 'search_ctaCorrProv_Detracciones') {
                filters = [
                    ["subsidiary", "anyof", subsidiary],
                    "AND",
                    ["mainline", "any", ""],
                    "AND",
                    [
                        [["type", "anyof", "VendBill"], "AND", ["account.number", "startswith", "42"]]
                    ],
                    "AND",
                    ["grossamount", "notequalto", "0.00"],
                    "AND",
                    ["trandate", "within", dateFrom, dateTo]
                ]

                // Filtro para mostrar solo las detracciones
                filters.push('AND')
                filters.push(['account.number', 'is', '42219111'])
            }

            // Agregar filtros adicionales (Filtran sobre lo que ya se especifico en "Agregar filtros")
            if (vendor) {
                filters.push('AND');
                filters.push(['name', 'anyof', vendor]);
            }
            /*
            if (ruc) {
                filters.push('AND');
                filters.push(["vendor.vatregnumber", "startswith", ruc]); // Existe un problema al buscar "Letras por Pagar", estos registros tienen el RUC en "vendorLine.vatregnumber"
            }
            if (ruc) {
                filters.push('AND');
                filters.push(["vendorLine.vatregnumber", "startswith", ruc]); // Existe un problema al buscar solo las detracciones, es decir registros con la cuenta "42219111", estos registros tiene el RUC en "vendor.vatregnumber"
            }
            */
            if (currency) {
                filters.push('AND');
                filters.push(['currency', 'anyof', currency]);
            }
            if (type) {
                filters.push('AND');
                filters.push(['type', 'anyof', type]);
            }
            if (Array.isArray(status) && status[0] != '') {
                filters.push('AND');
                filters.push(['status', 'anyof'].concat(status));
            }

            transactionQuery.updateFilters(filters);
        }

        /****************** Pagos de Registros Relacionados (VendBill, VendCred) ******************/

        function getDataRegRel(dataCtaCorPro) {

            // Declarar variables
            let resultTransaction = [];

            // Filtro de ID Interno
            let id_interno = [];
            if (Object.keys(dataCtaCorPro).length > 0) {
                dataCtaCorPro.forEach(element => {
                    if (element.id_interno) id_interno.push(element.id_interno);
                });
            }
            // Helper.error_log('', id_interno);

            // Validar search
            if (id_interno.length == 0) {
                return resultTransaction;
            }

            // Declarar search
            // Agregar tipo
            let transactionQuery = new Basic.CustomSearch('transaction');

            // Agregar columnas
            // Documento
            transactionQuery.pushColumn({ name: "internalid", label: "ID interno" });
            transactionQuery.pushColumn({ name: "typecode", label: "Código de tipo" });
            transactionQuery.pushColumn({ name: "type", label: "Tipo" });
            transactionQuery.pushColumn({ name: "custbody_ns_document_type", label: "NS Tipo de Documento" });
            transactionQuery.pushColumn({ name: "tranid", label: "Número de documento" });
            transactionQuery.pushColumn({ name: "trandate", label: "Fecha" });
            // Registros Relacionados - Transacción a pagar
            transactionQuery.pushColumn({
                name: "internalid",
                join: "payingTransaction",
                sort: search.Sort.ASC,
                label: "Transacción a pagar : ID interno"
            });
            transactionQuery.pushColumn({
                name: "typecode",
                join: "payingTransaction",
                label: "Transacción a pagar : Código de tipo"
            });
            transactionQuery.pushColumn({
                name: "type",
                join: "payingTransaction",
                label: "Transacción a pagar : Tipo"
            });
            transactionQuery.pushColumn({
                name: "custbody_ns_document_type",
                join: "payingTransaction",
                label: "Transacción a pagar : NS Tipo de Documento"
            });
            transactionQuery.pushColumn({
                name: "tranid",
                join: "payingTransaction",
                label: "Transacción a pagar : Número de documento"
            });
            transactionQuery.pushColumn({
                name: "transactionnumber",
                join: "payingTransaction",
                label: "Transacción a pagar : Número de transacción"
            });
            transactionQuery.pushColumn({
                name: "trandate",
                join: "payingTransaction",
                label: "Transacción a pagar : Fecha"
            });
            // Registros Relacionados - Transacción paga
            transactionQuery.pushColumn({
                name: "internalid",
                join: "paidTransaction",
                sort: search.Sort.ASC,
                label: "Transacción paga : ID interno"
            });
            transactionQuery.pushColumn({
                name: "typecode",
                join: "paidTransaction",
                label: "Transacción paga: Código de tipo"
            });
            transactionQuery.pushColumn({
                name: "type",
                join: "paidTransaction",
                label: "Transacción paga : Tipo"
            });
            transactionQuery.pushColumn({
                name: "custbody_ns_document_type",
                join: "paidTransaction",
                label: "Transacción paga : NS Tipo de Documento"
            });
            transactionQuery.pushColumn({
                name: "tranid",
                join: "paidTransaction",
                label: "Transacción paga : Número de documento"
            });
            transactionQuery.pushColumn({
                name: "transactionnumber",
                join: "paidTransaction",
                label: "Transacción paga : Número de transacción"
            });
            transactionQuery.pushColumn({
                name: "trandate",
                join: "paidTransaction",
                label: "Transacción paga : Fecha"
            });
            // Importes
            transactionQuery.pushColumn({ name: "fxgrossamount", label: "Importe bruto (moneda extranjera)" });
            transactionQuery.pushColumn({ name: "fxamountpaid", label: "Importe pagado (moneda extranjera)" });

            // Agregar filtros
            transactionQuery.updateFilters([
                ["mainline", "is", "T"],
                "AND",
                ["type", "anyof", "VendBill", "VendCred"],
                "AND",
                ["internalid", "anyof"].concat(id_interno)
            ]);

            // Cantidad de registros en search
            // transactionQuery.addSetting('count', true);

            // Buscar por indice o label en busqueda
            transactionQuery.addSetting('type', 'indice');

            // Crear y recorrer search
            transactionQuery.execute(node => {

                // Documento
                let id_interno = node.getValue(0);
                let tipo_codigo = node.getValue(1);
                let tipo = node.getValue(2);
                let tipo_nombre = node.getText(2);
                let ns_tipo_documento = node.getValue(3);
                let ns_tipo_documento_nombre = node.getText(3);
                let numero_documento = node.getValue(4);
                let fecha = node.getValue(5);
                // Registros Relacionados - Transacción a pagar
                let tran_pagar_id_interno = node.getValue(6);
                let tran_pagar_tipo_codigo = node.getValue(7);
                let tran_pagar_tipo = node.getValue(8);
                let tran_pagar_tipo_nombre = node.getText(8);
                let tran_pagar_ns_tipo_documento = node.getValue(9);
                let tran_pagar_ns_tipo_documento_nombre = node.getText(9);
                let tran_pagar_numero_documento = node.getValue(10);
                let tran_pagar_numero_transaccion = node.getValue(11);
                let tran_pagar_fecha = node.getValue(12);
                // Registros Relacionados - Transacción paga
                let tran_paga_id_interno = node.getValue(13);
                let tran_paga_tipo_codigo = node.getValue(14);
                let tran_paga_tipo = node.getValue(15);
                let tran_paga_tipo_nombre = node.getText(15);
                let tran_paga_ns_tipo_documento = node.getValue(16);
                let tran_paga_ns_tipo_documento_nombre = node.getText(16);
                let tran_paga_numero_documento = node.getValue(17);
                let tran_paga_numero_transaccion = node.getValue(18);
                let tran_paga_fecha = node.getValue(19);
                // Importes
                let importe_bruto_me = node.getValue(20); // Importe bruto (moneda extranjera)
                let importe_pagado_me = node.getValue(21); // Importe pagado (moneda extranjera)

                // Procesar informacion
                importe_bruto_me = parseFloat(importe_bruto_me);
                importe_pagado_me = parseFloat(importe_pagado_me);

                // Es Factura de Compra
                if (tipo_codigo == 'VendBill') {

                    // Registros Relacionados - Transacción a pagar
                    if (tran_pagar_id_interno && tran_pagar_tipo_codigo != 'FxReval') {
                        resultTransaction.push({
                            id_interno: id_interno,
                            tipo: { codigo: tipo_codigo, id: tipo, nombre: tipo_nombre },
                            ns_tipo_documento: { id: ns_tipo_documento, nombre: ns_tipo_documento_nombre },
                            regrel_id_interno: tran_pagar_id_interno,
                            regrel_banco: '',
                            regrel_tipo: { codigo: tran_pagar_tipo_codigo, id: tran_pagar_tipo, nombre: tran_pagar_tipo_nombre },
                            regrel_ns_tipo_documento: { id: tran_pagar_ns_tipo_documento, nombre: tran_pagar_ns_tipo_documento_nombre },
                            regrel_numero_documento: tran_pagar_numero_documento,
                            regrel_numero_transaccion: (tran_pagar_tipo_codigo == 'VendPymt') ? tran_pagar_numero_transaccion : '',
                            regrel_aplicado_transaccion__tipo_documento_numero_documento: '',
                            regrel_fecha: tran_pagar_fecha,
                            regrel_pago: 0,
                            importe_bruto_me: importe_bruto_me,
                            importe_pagado_me: importe_pagado_me,
                        });
                    }
                }

                // Es Crédito de Factura
                if (tipo_codigo == 'VendCred') {

                    // Registros Relacionados - Transacción paga
                    if (tran_paga_id_interno && tran_paga_tipo_codigo != 'FxReval') {
                        resultTransaction.push({
                            id_interno: id_interno,
                            tipo: { codigo: tipo_codigo, id: tipo, nombre: tipo_nombre },
                            ns_tipo_documento: { id: ns_tipo_documento, nombre: ns_tipo_documento_nombre },
                            regrel_id_interno: tran_paga_id_interno,
                            regrel_banco: '',
                            regrel_tipo: { codigo: tran_paga_tipo_codigo, id: tran_paga_tipo, nombre: tran_paga_tipo_nombre },
                            regrel_ns_tipo_documento: { id: tran_paga_ns_tipo_documento, nombre: tran_paga_ns_tipo_documento_nombre },
                            regrel_numero_documento: tran_paga_numero_documento,
                            regrel_numero_transaccion: (tran_paga_tipo_codigo == 'VendPymt') ? tran_paga_numero_transaccion : '',
                            regrel_aplicado_transaccion__tipo_documento_numero_documento: '',
                            regrel_fecha: tran_paga_fecha,
                            regrel_pago: 0,
                            importe_bruto_me: importe_bruto_me,
                            importe_pagado_me: importe_pagado_me,
                        });
                    }
                }
            });

            // Helper.error_log('getDataPagosRegRel', resultTransaction);
            return resultTransaction;
        }

        function getDataRegRel_Detalle(dataPagosRegRel) {

            // Declarar variables
            let resultTransaction = [];

            // Filtro de ID Interno de Registros Relacionados
            let regrel_id_interno = [];
            if (Object.keys(dataPagosRegRel).length > 0) {
                dataPagosRegRel.forEach(element => {
                    if (element.regrel_id_interno) regrel_id_interno.push(element.regrel_id_interno)
                });
            }
            // Helper.error_log('', id_interno);

            // Validar search
            if (regrel_id_interno.length == 0) {
                return resultTransaction;
            }

            // Declarar search
            // Agregar tipo
            let transactionQuery = new Basic.CustomSearch('transaction');

            // Agregar columnas
            transactionQuery.pushColumn({ name: "mainline", label: "*" });
            transactionQuery.pushColumn({ name: "internalid", label: "ID interno" });
            transactionQuery.pushColumn({ name: "typecode", label: "Type Code" });
            transactionQuery.pushColumn({ name: "type", label: "Type" });
            transactionQuery.pushColumn({ name: "tranid", label: "Document Number" });
            // Aplicado a la transacción
            transactionQuery.pushColumn({ name: "appliedtotransaction", label: "Aplicado a la transacción" });
            transactionQuery.pushColumn({
                name: "internalid",
                join: "appliedToTransaction",
                label: "Aplicado a la transacción : ID interno"
            });
            transactionQuery.pushColumn({
                name: "fxamountpaid",
                join: "appliedToTransaction",
                label: "Aplicado a la transacción : Importe pagado (moneda extranjera)"
            });
            // Cerrar
            transactionQuery.pushColumn({ name: "appliedtoforeignamount", label: "Aplicado al vínculo importe (moneda extranjera)" });
            transactionQuery.pushColumn({ name: "fxamountpaid", label: "Importe pagado (moneda extranjera)" });
            transactionQuery.pushColumn({
                name: "custrecord_ns_bank_name",
                join: "account",
                label: "NS Banco"
            });

            // Agregar filtros
            transactionQuery.updateFilters([
                ["mainline", "any", ""],
                "AND",
                ["internalid", "anyof"].concat(regrel_id_interno)
            ]);

            // Cantidad de registros en search
            // transactionQuery.addSetting('count', true);

            // Buscar por indice o label en busqueda
            transactionQuery.addSetting('type', 'indice');

            // Crear y recorrer search
            transactionQuery.execute(node => {

                let regrel_mainline = node.getValue(0);
                let regrel_id_interno = node.getValue(1);
                let regrel_tipo_codigo = node.getValue(2);
                let regrel_tipo = node.getValue(3);
                let regrel_tipo_nombre = node.getText(3);
                let regrel_numero_documento = node.getValue(4);
                // Aplicado a la transacción
                let aplicado_transaccion__tipo_documento_numero_documento = node.getText(5);
                let aplicado_transaccion_id_interno = node.getValue(6);
                let aplicado_transaccion_importe_pagado_me = node.getValue(7);
                // Cerrar
                let aplicado_vinculo_importe_me = node.getValue(8);
                let importe_pagado_me = node.getValue(9);
                let banco = node.getValue(10);
                let banco_nombre = node.getText(10);

                // Procesar informacion
                aplicado_transaccion_importe_pagado_me = parseFloat(aplicado_transaccion_importe_pagado_me);
                aplicado_vinculo_importe_me = parseFloat(aplicado_vinculo_importe_me);
                importe_pagado_me = parseFloat(importe_pagado_me);

                resultTransaction.push({
                    regrel_mainline: regrel_mainline,
                    regrel_id_interno: regrel_id_interno,
                    regrel_tipo: { codigo: regrel_tipo_codigo, id: regrel_tipo, nombre: regrel_tipo_nombre },
                    regrel_numero_documento: regrel_numero_documento,
                    // Aplicado a la transacción
                    aplicado_transaccion__tipo_documento_numero_documento: aplicado_transaccion__tipo_documento_numero_documento,
                    aplicado_transaccion_id_interno: aplicado_transaccion_id_interno,
                    aplicado_transaccion_importe_pagado_me: aplicado_transaccion_importe_pagado_me,
                    // Cerrar
                    aplicado_vinculo_importe_me: aplicado_vinculo_importe_me,
                    importe_pagado_me: importe_pagado_me,
                    banco: { id: banco, nombre: banco_nombre },
                });
            });

            // Helper.error_log('getDataPagosRegRel_Detalle', resultTransaction);
            return resultTransaction;
        }

        /****************** Pagos de Detracciones (VendBill) ******************/

        function getDataDetracciones(dataCtaCorPro) {

            // Declarar variables
            let resultTransaction = [];

            // Filtro de ID Interno
            let id_interno = [];
            if (Object.keys(dataCtaCorPro).length > 0) {
                dataCtaCorPro.forEach(element => {
                    if (element.pagos_detraccion.es_detraccion == 'T') {
                        if (element.id_interno) id_interno.push(element.id_interno);
                    }
                });
            }
            // Helper.error_log('', id_interno);

            // Validar search
            if (id_interno.length == 0) {
                return resultTransaction;
            }

            // Declarar search
            // Agregar tipo
            let transactionQuery = new Basic.CustomSearch('transaction');

            // Agregar columnas
            transactionQuery.pushColumn({ name: "internalid", label: "Internal ID" });
            transactionQuery.pushColumn({ name: "tranid", label: "Número de documento" });
            transactionQuery.pushColumn({ name: "fxgrossamount", label: "Importe bruto (moneda extranjera)" });
            transactionQuery.pushColumn({ name: "custcol_4601_witaxline", label: "Línea de impuesto de retención" });

            // Agregar filtros
            transactionQuery.updateFilters([
                ["mainline", "any", ""],
                "AND",
                [
                    [["type", "anyof", "VendBill"], "AND", ["account.number", "startswith", "42"]]
                ],
                "AND",
                ["grossamount", "notequalto", "0.00"],
                "AND",
                ['account.number', 'is', '42219111'],
                "AND",
                ["internalid", "anyof"].concat(id_interno)
            ]);

            // Cantidad de registros en search
            // transactionQuery.addSetting('count', true);

            // Buscar por indice o label en busqueda
            transactionQuery.addSetting('type', 'indice');

            // Crear y recorrer search
            transactionQuery.execute(node => {

                let id_interno = node.getValue(0);
                let numero_documento = node.getValue(1);
                let importe_bruto_me = node.getValue(2); // Importe bruto (moneda extranjera)
                let custcol_4601_witaxline = node.getValue(3); // Línea de impuesto de retención

                // Procesar informacion
                importe_bruto_me = parseFloat(importe_bruto_me);

                resultTransaction.push({
                    id_interno: id_interno,
                    numero_documento: numero_documento,
                    importe_bruto_me: importe_bruto_me,
                    custcol_4601_witaxline: custcol_4601_witaxline
                });
            });

            // Helper.error_log('getDataDetracciones', resultTransaction);
            return resultTransaction;
        }

        function getDataIdDiariosDetracciones(dataCtaCorPro) {

            // Declarar variables
            let resultTransaction = [];

            // Filtro de ID Interno
            let id_interno = [];
            if (Object.keys(dataCtaCorPro).length > 0) {
                dataCtaCorPro.forEach(element => {
                    if (element.tipo.codigo == 'VendBill' && element.pagos_detraccion.es_detraccion == 'T') {
                        if (element.id_interno) id_interno.push(element.id_interno);
                    }
                });
            }
            // Helper.error_log('', id_interno);

            // Validar search
            if (id_interno.length == 0) {
                return resultTransaction;
            }

            // Declarar search
            // Agregar tipo
            let transactionQuery = new Basic.CustomSearch('transaction');

            // Agregar columnas
            transactionQuery.pushColumn({
                name: "internalid",
                summary: "GROUP",
                label: "Internal ID"
            });

            // Agregar filtros
            transactionQuery.updateFilters([
                ["mainline", "any", ""],
                "AND",
                ["type", "anyof", "Journal"],
                "AND",
                ["custcol_ns_detracc_bill.internalid", "anyof"].concat(id_interno)
            ]);

            // Cantidad de registros en search
            // transactionQuery.addSetting('count', true);

            // Buscar por indice o label en busqueda
            transactionQuery.addSetting('type', 'indice');

            // Crear y recorrer search
            transactionQuery.execute(node => {

                let id_interno = node.getValue(0);

                resultTransaction.push({
                    id_interno: id_interno
                });
            });

            // Helper.error_log('getDataIdDiariosDetracciones', resultTransaction);
            return resultTransaction;
        }

        function getDataDiarios(dataIdDiarios) {

            // Declarar variables
            let resultTransaction = [];

            // Filtro de ID Interno
            let id_interno = [];
            if (Object.keys(dataIdDiarios).length > 0) {
                dataIdDiarios.forEach(element => {
                    if (element) id_interno.push(element.id_interno);
                });
            }
            // Helper.error_log('', id_interno);

            // Validar search
            if (id_interno.length == 0) {
                return resultTransaction;
            }

            // Declarar search
            // Agregar tipo
            let transactionQuery = new Basic.CustomSearch('transaction');

            // Agregar columnas
            transactionQuery.pushColumn({ name: "mainline", label: "*" });
            transactionQuery.pushColumn({ name: "internalid", label: "Internal ID" });
            transactionQuery.pushColumn({ name: "typecode", label: "Type Code" });
            transactionQuery.pushColumn({ name: "type", label: "Type" });
            transactionQuery.pushColumn({ name: "tranid", label: "Document Number" });
            transactionQuery.pushColumn({ name: "custcol_ns_detracc_bill", label: "NS LN Bill Detraccion" });
            // transactionQuery.pushColumn({ // Esto trae cabecera y detalle de la factura a la cual se aplico la detracción
            //     name: "internalid",
            //     join: "CUSTCOL_NS_DETRACC_BILL",
            //     label: "NS LN Bill Detraccion : ID interno"
            // });
            transactionQuery.pushColumn({ name: "custcol_ns_detraccion_number", label: "NS LN Numero Detraccion" });
            transactionQuery.pushColumn({ name: "debitfxamount", label: "Amount (Debit) (Foreign Currency)" });
            transactionQuery.pushColumn({ name: "creditfxamount", label: "Amount (Credit) (Foreign Currency)" });
            transactionQuery.pushColumn({
                name: "custrecord_ns_bank_name",
                join: "account",
                label: "NS Banco"
            });
            transactionQuery.pushColumn({ name: "trandate", label: "Fecha" });

            // Agregar filtros
            transactionQuery.updateFilters([
                ["mainline", "any", ""],
                "AND",
                ["internalid", "anyof"].concat(id_interno)
            ]);

            // Cantidad de registros en search
            // transactionQuery.addSetting('count', true);

            // Buscar por indice o label en busqueda
            transactionQuery.addSetting('type', 'indice');

            // Crear y recorrer search
            transactionQuery.execute(node => {

                let mainline = node.getValue(0);
                let id_interno = node.getValue(1);
                let tipo_codigo = node.getValue(2);
                let tipo = node.getValue(3);
                let tipo_nombre = node.getText(3);
                let numero_documento = node.getValue(4);
                let ns_factura_detraccion_id_interno = node.getValue(5);
                let ns_numero_detraccion = node.getValue(6);
                let importe_debito_me = node.getValue(7); // Importe debito (moneda extranjera)
                let importe_credito_me = node.getValue(8); // Importe crédito (moneda extranjera)
                let banco = node.getValue(9);
                let banco_nombre = node.getText(9);
                let fecha = node.getValue(10);

                // Procesar informacion
                importe_debito_me = parseFloat(importe_debito_me);
                importe_credito_me = parseFloat(importe_credito_me);

                resultTransaction.push({
                    mainline: mainline,
                    id_interno: id_interno,
                    tipo: { codigo: tipo_codigo, id: tipo, nombre: tipo_nombre },
                    numero_documento: numero_documento,
                    ns_factura_detraccion_id_interno: ns_factura_detraccion_id_interno,
                    ns_numero_detraccion: ns_numero_detraccion,
                    importe_debito_me: importe_debito_me,
                    importe_credito_me: importe_credito_me,
                    banco: { id: banco, nombre: banco_nombre },
                    fecha: fecha,
                });
            });

            // Helper.error_log('getDataDiarios', resultTransaction);
            return resultTransaction;
        }

        /****************** Pagos de Letras por Pagar (Custom122) ******************/

        function getDataIdPagosFacturas(dataCtaCorPro) {

            // Declarar variables
            let resultTransaction = [];

            // Filtro de ID Interno
            let id_interno = [];
            if (Object.keys(dataCtaCorPro).length > 0) {
                dataCtaCorPro.forEach(element => {
                    if (element.tipo.codigo == 'Custom122') {
                        if (element.id_interno) id_interno.push(element.id_interno);
                    }
                });
            }
            // Helper.error_log('', id_interno);

            // Validar search
            if (id_interno.length == 0) {
                return resultTransaction;
            }

            // Declarar search
            // Agregar tipo
            let transactionQuery = new Basic.CustomSearch('transaction');

            // Agregar columnas
            transactionQuery.pushColumn({
                name: "internalid",
                summary: "GROUP",
                label: "Internal ID"
            });

            // Agregar filtros
            transactionQuery.updateFilters([
                ["mainline", "any", ""],
                "AND",
                ["type", "anyof", "VendPymt"],
                "AND",
                ["appliedtotransaction.internalid", "anyof"].concat(id_interno)
            ]);

            // Cantidad de registros en search
            // transactionQuery.addSetting('count', true);

            // Buscar por indice o label en busqueda
            transactionQuery.addSetting('type', 'indice');

            // Crear y recorrer search
            transactionQuery.execute(node => {

                let id_interno = node.getValue(0);

                resultTransaction.push({
                    id_interno: id_interno
                });
            });

            // Helper.error_log('getDataIdPagosFacturas', resultTransaction);
            return resultTransaction;
        }

        function getDataPagosFacturas(dataIdPagosFacturas) {

            // Declarar variables
            let resultTransaction = [];

            // Filtro de ID Interno
            let id_interno = [];
            if (Object.keys(dataIdPagosFacturas).length > 0) {
                dataIdPagosFacturas.forEach(element => {
                    if (element) id_interno.push(element.id_interno);
                });
            }
            // Helper.error_log('', id_interno);

            // Validar search
            if (id_interno.length == 0) {
                return resultTransaction;
            }

            // Declarar search
            // Agregar tipo
            let transactionQuery = new Basic.CustomSearch('transaction');

            // Agregar columnas
            transactionQuery.pushColumn({ name: "mainline", label: "*" });
            transactionQuery.pushColumn({ name: "internalid", label: "Internal ID" });
            transactionQuery.pushColumn({ name: "typecode", label: "Type Code" });
            transactionQuery.pushColumn({ name: "type", label: "Type" });
            transactionQuery.pushColumn({ name: "tranid", label: "Document Number" });
            transactionQuery.pushColumn({ name: "transactionnumber", label: "Transaction Number" });
            transactionQuery.pushColumn({ name: "appliedtotransaction", label: "Aplicado a la transacción" });
            // transactionQuery.pushColumn({ // Esto trae cabecera y detalle de la factura a la cual se aplico la detracción
            //     name: "internalid",
            //     join: "appliedtotransaction",
            //     label: "Aplicado a la transacción : ID interno"
            // });
            transactionQuery.pushColumn({ name: "debitfxamount", label: "Amount (Debit) (Foreign Currency)" });
            transactionQuery.pushColumn({ name: "creditfxamount", label: "Amount (Credit) (Foreign Currency)" });
            transactionQuery.pushColumn({
                name: "custrecord_ns_bank_name",
                join: "account",
                label: "NS Banco"
            });
            transactionQuery.pushColumn({ name: "trandate", label: "Fecha" });

            // Agregar filtros
            transactionQuery.updateFilters([
                ["mainline", "any", ""],
                "AND",
                ["internalid", "anyof"].concat(id_interno)
            ]);

            // Cantidad de registros en search
            // transactionQuery.addSetting('count', true);

            // Buscar por indice o label en busqueda
            transactionQuery.addSetting('type', 'indice');

            // Crear y recorrer search
            transactionQuery.execute(node => {

                let mainline = node.getValue(0);
                let id_interno = node.getValue(1);
                let tipo_codigo = node.getValue(2);
                let tipo = node.getValue(3);
                let tipo_nombre = node.getText(3);
                let numero_documento = node.getValue(4);
                let numero_transaccion = node.getValue(5);
                let aplicado_transaccion_id_interno = node.getValue(6);
                let importe_debito_me = node.getValue(7); // Importe debito (moneda extranjera)
                let importe_credito_me = node.getValue(8); // Importe crédito (moneda extranjera)
                let banco = node.getValue(9);
                let banco_nombre = node.getText(9);
                let fecha = node.getValue(10);

                // Procesar informacion
                importe_debito_me = parseFloat(importe_debito_me);
                importe_credito_me = parseFloat(importe_credito_me);

                resultTransaction.push({
                    mainline: mainline,
                    id_interno: id_interno,
                    tipo: { codigo: tipo_codigo, id: tipo, nombre: tipo_nombre },
                    numero_documento: numero_documento,
                    numero_transaccion: numero_transaccion,
                    aplicado_transaccion_id_interno: aplicado_transaccion_id_interno,
                    importe_debito_me: importe_debito_me,
                    importe_credito_me: importe_credito_me,
                    banco: { id: banco, nombre: banco_nombre },
                    fecha: fecha,
                });
            });

            // Helper.error_log('getDataPagosFacturas', resultTransaction);
            return resultTransaction;
        }

        return {
            getDataCtaCorPro,
            // Pagos de Registros Relacionados (VendBill, VendCred)
            getDataRegRel,
            getDataRegRel_Detalle,
            // Pagos de Detracciones (VendBill)
            getDataDetracciones,
            getDataIdDiariosDetracciones,
            getDataDiarios,
            // Pagos de Letras por Pagar (Custom122)
            getDataIdPagosFacturas,
            getDataPagosFacturas
        }

    });
