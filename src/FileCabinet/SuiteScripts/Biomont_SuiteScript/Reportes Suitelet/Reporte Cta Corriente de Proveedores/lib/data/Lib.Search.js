/**
 * @NApiVersion 2.1
 */
define(['./Lib.Basic', './Lib.Helper', 'N'],

    function (Basic, Helper, N) {

        const { search } = N;

        /******************/

        function getDataCtaCorrProv(params) {

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
            transactionQuery.pushColumn({ name: "type", label: "Tipo" });
            transactionQuery.pushColumn({ name: "typecode", label: "Código de tipo" });
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
                let proveedor_nombre = node.getText(4);
                let fecha_registro = node.getValue(5);
                let fecha_emision = node.getValue(6);
                let fecha_vencimiento = node.getValue(7);
                let tipo = node.getValue(8);
                let tipo_nombre = node.getText(8);
                let tipo_codigo = node.getValue(9);
                let ns_tipo_documento = node.getValue(10);
                let ns_tipo_documento_nombre = node.getText(10);
                let numero_documento = node.getValue(11);
                let moneda = node.getValue(12);
                let moneda_nombre = node.getText(12);
                let importe_bruto_me = node.getValue(13); // Importe bruto (moneda extranjera)
                let importe_pagado_me = node.getValue(14); // Importe pagado (moneda extranjera)
                let estado = node.getText(15); // Estado
                let ns_porcentaje_detraccion = node.getValue(16); // NS Porcentaje DET/RET
                let ns_numero_detraccion = node.getValue(17); // NS Num. Deposito Detraccion

                resultTransaction.push({
                    id_interno: id_interno,
                    cuenta: { numero: cuenta_numero, descripcion: cuenta_descripcion },
                    proveedor: { ruc: proveedor_ruc, nombre: proveedor_nombre },
                    fecha_registro: fecha_registro,
                    fecha_emision: fecha_emision,
                    fecha_vencimiento: fecha_vencimiento,
                    tipo: { id: tipo, nombre: tipo_nombre, codigo: tipo_codigo },
                    ns_tipo_documento: { id: ns_tipo_documento, nombre: ns_tipo_documento_nombre },
                    numero_documento: numero_documento,
                    moneda: { id: moneda, nombre: moneda_nombre },
                    importe_bruto_me: importe_bruto_me,
                    importe_pagado_me: importe_pagado_me,
                    estado: estado,
                    ns_porcentaje_detraccion: ns_porcentaje_detraccion,
                    ns_numero_detraccion: ns_numero_detraccion
                });
            });

            // Helper.error_log('getDataCtaCorrienteProveedores', resultTransaction);
            return resultTransaction;
        }

        function getDataCtaCorrProv_Detracciones(params) {

            // Obtener parametros
            let { subsidiary, dateFrom, dateTo, vendor, ruc, currency, type, status } = params;

            // Declarar variables
            let resultTransaction = [];

            // Declarar search
            // Agregar tipo
            let transactionQuery = new Basic.CustomSearch('transaction');

            // Agregar columnas
            transactionQuery.pushColumn({ name: "internalid", label: "Internal ID" });
            transactionQuery.pushColumn({ name: "tranid", label: "Número de documento" });
            transactionQuery.pushColumn({ name: "fxgrossamount", label: "Importe bruto (moneda extranjera)" });
            transactionQuery.pushColumn({ name: "custcol_4601_witaxline", label: "Línea de impuesto de retención" });

            // Agregar filtros
            addFiltersCtaCorrProv(transactionQuery, params, 'search_ctaCorrProv_Detracciones');

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

                resultTransaction.push({
                    id_interno: id_interno,
                    numero_documento: numero_documento,
                    importe_bruto_me: importe_bruto_me,
                    custcol_4601_witaxline: custcol_4601_witaxline
                });
            });

            // Helper.error_log('getDataCtaCorrienteProveedores', resultTransaction);
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
                        ["type", "anyof", "VendCred"]
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
            // if (ruc) {
            //     filters.push('AND');
            //     filters.push(["vendor.vatregnumber", "startswith", ruc]); // Existe un problema al buscar "Letras por Pagar", estos registros tienen el RUC en "vendorLine.vatregnumber"
            // }
            // if (ruc) {
            //     filters.push('AND');
            //     filters.push(["vendorLine.vatregnumber", "startswith", ruc]); // Existe un problema al buscar solo las detracciones, es decir registros con la cuenta "42219111", estos registros tiene el RUC en "vendor.vatregnumber"
            // }
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

        function getVendorIdByRuc(ruc) {
            var searchObj = search.create({
                type: search.Type.VENDOR,
                columns: ['internalid'],
                filters: [
                    search.createFilter({
                        name: 'vatregnumber',
                        operator: search.Operator.IS,
                        values: ruc
                    })
                ]
            });

            var searchResult = searchObj.run().getRange({
                start: 0,
                end: 1
            });

            if (searchResult && searchResult.length > 0) {
                return searchResult[0].getValue('internalid');
            }

            return null;
        }

        return { getDataCtaCorrProv, getDataCtaCorrProv_Detracciones, getVendorIdByRuc }

    });
