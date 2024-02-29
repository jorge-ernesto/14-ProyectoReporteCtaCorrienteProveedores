/**
 * @NApiVersion 2.1
 */
define(['N', './Lib.Helper'],

    function (N, Helper) {

        const { search } = N;

        /******************/

        const STATIC_DATA = {
            typeForm: {
                'VendBill': 'Factura de compra',
                'Custom122': 'Letras por Pagar',
                'VendCred': 'Crédito de Factura',
            },
            statusForm: {
                'VendBill:A': 'Factura de compra:Abierta',
                'VendBill:B': 'Factura de compra:Pagado por completo',
                'VendBill:C': 'Factura de compra:Cancelada',
                'VendBill:D': 'Factura de compra:Aprobación pendiente',
                'VendBill:E': 'Factura de compra:Rechazada',
                'VendBill:F': 'Factura de compra:Pago en tránsito',
                'Custom122:A': 'Letras por Pagar:Canjeada',
                'Custom122:B': 'Letras por Pagar:Refinanciada',
                'Custom122:C': 'Letras por Pagar:Protestada',
                'Custom122:V': 'Letras por Pagar:Voided',
            },
            balanceForm: {
                'balancePendiente': 'Con saldo pendiente',
                'balanceCero': 'Sin saldo pendiente',
            }
        }

        const DATA = {
            Report: {
                'CTA_CORRIENTE_PROV': 1,
                'CTA_CORRIENTE_PROV_XLS': 2,
                'CTA_CORRIENTE_PROV_CSV': 3,
                'DETALLE_CTA_CORRIENTE_PROV': 4,
                'DETALLE_CTA_CORRIENTE_PROV_XLS': 5
            }
        }

        const TEMPLATE = {
            1: 'CtaCorrienteProv.html',
            2: 'CtaCorrienteProv.ftl',
            3: 'CtaCorrienteProv.csv',
            4: 'DetalleCtaCorrienteProv.html',
            5: 'DetalleCtaCorrienteProv.ftl'
        }

        /******************/

        class CustomSearch {

            constructor(type) {
                this.searchObject = {
                    type: type,
                    columns: [],
                    filters: []
                }
                this.settings = {}
            }

            updateFilters(filters) {
                this.searchObject.filters = Array.isArray(filters) ? filters : [];
            }

            pushColumn(context) {
                this.searchObject.columns.push(context);
            }

            addSetting(key, value) {
                this.settings[key] = value;
            }

            execute(callback) {
                // Declarar search
                let searchObject = this.searchObject;
                let settings = this.settings;

                // Crear search
                let searchContext = search.create(searchObject);

                // Cantidad de registros en search
                if (settings.count === true) {
                    let count = searchContext.runPaged().count;
                    Helper.error_log('count', count)
                }

                // Recorrer search - con mas de 4000 registros
                let pageData = searchContext.runPaged({ pageSize: 1000 }); // El minimo de registros que se puede traer por pagina es 50, pondremos 1000 para que en el caso existan 4500 registros, hayan 5 paginas como maximo y no me consuma mucha memoria

                pageData.pageRanges.forEach(function (pageRange) {
                    var myPage = pageData.fetch({ index: pageRange.index });
                    myPage.data.forEach((row) => {

                        // Simular devolver getValue y getText
                        let currentRow = {
                            data: {},
                            getValue: function (id) {
                                return currentRow.data[id].value;
                            },
                            getText: function (id) {
                                return currentRow.data[id].text;
                            }
                        };

                        // Obtener informacion
                        let { columns } = row;
                        // Helper.error_log('columns', columns);

                        // Columns tiene los campos solicitados en la busqueda
                        columns.forEach((currentColumn, i) => {
                            let id = undefined;

                            if (settings.type === 'indice')
                                id = i;
                            else if (settings.type === 'label')
                                id = currentColumn.label;
                            else if (settings.type === 'name')
                                id = currentColumn.name;

                            let value = row.getValue(currentColumn);
                            let text = row.getText(currentColumn);
                            currentRow.data[id] = { value, text };
                        });

                        callback(currentRow); // El callback es todo un problema, pero lo entiendo medianamente
                    });
                });
            }
        }

        return {
            STATIC_DATA,
            DATA,
            TEMPLATE,
            CustomSearch
        }

    });
