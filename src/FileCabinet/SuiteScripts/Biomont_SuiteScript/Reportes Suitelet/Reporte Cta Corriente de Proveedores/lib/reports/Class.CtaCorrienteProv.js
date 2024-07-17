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
                if (true) {
                    // Listado de documentos (VendBill, Custom122, VendCred)
                    let dataCtaCorPro = Search.getDataCtaCorPro(params);

                    // Pagos de Registros Relacionados (VendBill, VendCred)
                    let dataRegRel = [];
                    let dataRegRel_Detalle = [];
                    let dataRegRel_Completo = [];

                    // Pagos de Detracciones (VendBill)
                    let dataDetracciones = Search.getDataDetracciones(dataCtaCorPro);
                    let dataIdDiariosDetracciones = Search.getDataIdDiariosDetracciones(dataCtaCorPro);
                    let dataDiariosDetracciones = Search.getDataDiarios(dataIdDiariosDetracciones);

                    // Pagos de Letras por Pagar (Custom122)
                    let dataIdPagosFacturas = [];
                    let dataPagosFacturas = [];

                    // Procesar reporte
                    let dataCtaCorPro_Completo = Process.getDataCtaCorPro_Completo(dataCtaCorPro, dataRegRel_Completo, dataDetracciones, dataDiariosDetracciones, dataPagosFacturas, balance);
                    let dataCtaCorPro_Agrupado = Process.agruparCtaCorPro(dataCtaCorPro_Completo);
                    let dataReporte = Process.getReporteFreeMarker(dataCtaCorPro_Agrupado);

                    // Debug
                    // Helper.error_log('data', { dataCtaCorPro });
                    // Helper.error_log('data', { dataRegRel, dataRegRel_Detalle });
                    // Helper.error_log('data', { dataCtaCorPro_Completo, dataCtaCorPro_Agrupado, dataReporte });

                    // Enviar data a archivos HTML o Excel
                    let titleDocument = 'Reporte Cuenta Corriente de Proveedores';
                    this.addInput('name', titleDocument);
                    this.addInput('dateFrom', dateFrom);
                    this.addInput('dateTo', dateTo);
                    this.addInput('transactions', dataReporte);
                }
            }
        }

        return CtaCorrienteProv

    });
