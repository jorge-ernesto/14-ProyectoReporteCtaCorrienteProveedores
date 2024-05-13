/**
 * @NApiVersion 2.1
 */
define(['N'],

    function (N) {

        const { runtime } = N;

        /******************/

        const LANGUAGE = {
            'es': 2,
            'sp': 2,
            'en': 1
        }

        const DEFAULT = {
            2: '- No Definido -',
            1: '- Undefined -'
        }

        const LABELS = [
            ['custpage_report_title', 'Sales Discount Report', 'Reporte Cuenta Corriente de Proveedores'],
            ['custpage_report_title_detail', 'Sales Discount Report Detail', 'Detalle del Reporte Cuenta Corriente de Proveedores'],
            ['custpage_report_group_criteria_1', 'Main', 'Inicio'],
            ['custpage_report_group_criteria_2', 'Filters', 'Filtros'],
            ['custpage_report_criteria_report', 'Report', 'Presentación'],
            ['custpage_report_criteria_subsidiary', 'Subsidiary', 'Subsidiaria'],
            ['custpage_report_criteria_date_from', 'Date From', 'Desde'],
            ['custpage_report_criteria_date_to', 'Date To', 'Hasta'],
            ['custpage_report_criteria_vendor', 'Vendor', 'Proveedor'],
            ['custpage_report_criteria_ruc', 'RUC', 'RUC'],
            ['custpage_report_criteria_currency', 'Currency', 'Moneda'],
            ['custpage_report_criteria_type', 'Type', 'Tipo'],
            ['custpage_report_criteria_status', 'Status', 'Estado'],
            ['custpage_report_criteria_balance', 'Balance', 'Saldo'],
            ['custpage_report_button_visualize', 'Generate', 'Generar'],
            ['custpage_report_button_export_xls', 'Export Excel', 'Exportar Excel'],
            ['custpage_report_button_export_csv', 'Export CSV', 'Exportar CSV']
        ]

        class DAO {

            constructor() {
                let currentLanguage = runtime.getCurrentUser().getPreference('language');
                currentLanguage = LANGUAGE[currentLanguage];

                if (!currentLanguage) currentLanguage = LANGUAGE['es'];

                let data = {};
                LABELS.forEach(currentLabel => {
                    let id = currentLabel[0];
                    let label = currentLabel[currentLanguage];
                    data[id] = label;
                })
                this.translate = data;
                this.undefined = DEFAULT[currentLanguage];
            }

            get(id) {
                return this.translate[id] ? this.translate[id] : this.undefined;
            }
        }

        return DAO;

    });
