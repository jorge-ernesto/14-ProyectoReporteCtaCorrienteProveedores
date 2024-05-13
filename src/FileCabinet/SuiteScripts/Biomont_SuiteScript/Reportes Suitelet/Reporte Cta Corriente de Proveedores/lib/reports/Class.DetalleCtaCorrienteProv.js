/**
 * @NApiVersion 2.1
 */
define(['./Class.ReportRenderer', '../data/Lib.Basic', '../data/Lib.Search', '../data/Lib.Process', '../data/Lib.Helper', 'N'],

    function (ReportRenderer, Basic, Search, Process, Helper, N) {

        const { log } = N;

        /******************/

        class DetalleCtaCorrienteProv extends ReportRenderer {

            constructor(params) {
                // Enviamos template a ReportRenderer
                if (params.xls === 'T') {
                    super(Basic.DATA.Report.DETALLE_CTA_CORRIENTE_PROV_XLS);
                } else {
                    super(Basic.DATA.Report.DETALLE_CTA_CORRIENTE_PROV);
                }

                // Obtener parametros
                let { subsidiary, period } = params;

                // Debug
                // Helper.error_log('params', params);

                // Obtener datos para enviar
                let dataDescuentoVtas_FacturasAgrupadas = Search.getDescuentoVtas_Facturas(subsidiary, [period]); // Esto es un array de detalle
                let dataDescuentoVtas_NCDetalladas = Search.getDescuentoVtas_NC(subsidiary, [period]); // Esto es un array de detalle
                let dataDescuentoVtas = Process.getDescuentoVtas(dataDescuentoVtas_FacturasAgrupadas, dataDescuentoVtas_NCDetalladas); // Esto es un array de detalle
                dataDescuentoVtas = Process.getDescuentoVtasDetallado(dataDescuentoVtas); // Aca se convierte en un JSON agrupado

                // Procesar reporte
                let dataReporte = Process.getReporteFreeMarker(dataDescuentoVtas);

                // Debug
                // Helper.error_log('dataDescuentoVtas_FacturasAgrupadas', dataDescuentoVtas_FacturasAgrupadas);
                // Helper.error_log('dataDescuentoVtas_NCDetalladas', dataDescuentoVtas_NCDetalladas);
                // Helper.error_log('dataDescuentoVtas', dataDescuentoVtas);
                // Helper.error_log('dataReporte', dataReporte);

                // Enviar data a archivos HTML o Excel
                let titleDocument = 'Detalle del Reporte Descuentos Sobre Ventas';
                this.addInput('name', titleDocument);
                this.addInput('period', dataReporte.dataDescuentoVtas.detalle[0].periodo_contable_nombre); // period
                this.addInput('transactions', dataReporte)
            }
        }

        return DetalleCtaCorrienteProv

    });
