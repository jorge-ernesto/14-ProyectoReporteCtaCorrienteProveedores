/**
 * @NApiVersion 2.1
 */
define(['./Class.ReportRenderer', '../data/Lib.Basic', '../data/Lib.Search', '../data/Lib.Process', '../data/Lib.Helper', 'N'],

    function (ReportRenderer, Basic, Search, Process, Helper, N) {

        const { log } = N;

        /******************/

        class CtaCorrienteProv extends ReportRenderer {

            constructor(params) {
                // Enviamos template a ReportRenderer
                if (params.xls === 'T') {
                    super(Basic.DATA.Report.CTA_CORRIENTE_PROV_XLS);
                } else if (params.csv === 'T') {
                    super(Basic.DATA.Report.CTA_CORRIENTE_PROV_CSV);
                } else {
                    super(Basic.DATA.Report.CTA_CORRIENTE_PROV);
                }

                // Obtener parametros
                let { subsidiary, dateFrom, dateTo, vendor, ruc, currency, type, status, balance } = params;

                // Debug
                // Helper.error_log('params', params);

                // Obtener datos para enviar
                let dataCtaCorrProv = Search.getDataCtaCorrProv(params);
                let dataCtaCorrProv_Detracciones = Search.getDataCtaCorrProv_Detracciones(params);
                let dataCtaCorrProv_Completo = Process.getDataCtaCorrProv_Completo(dataCtaCorrProv, dataCtaCorrProv_Detracciones, balance)

                // Procesar reporte
                let dataReporte = Process.getReporteFreeMarker(dataCtaCorrProv_Completo);

                // Debug
                // Helper.error_log('dataReporte', dataReporte);

                // Enviar data a archivos HTML o Excel
                let titleDocument = 'Reporte Cuenta Corriente de Proveedores';
                this.addInput('name', titleDocument);
                this.addInput('dateFrom', dateFrom);
                this.addInput('dateTo', dateTo);
                this.addInput('transactions', dataReporte);
            }
        }

        return CtaCorrienteProv

    });
