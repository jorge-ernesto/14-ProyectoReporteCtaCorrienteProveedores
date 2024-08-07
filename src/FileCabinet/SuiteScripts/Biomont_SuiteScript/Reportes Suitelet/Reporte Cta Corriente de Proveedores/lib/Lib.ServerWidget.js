/**
 * @NApiVersion 2.1
 */
define(['N', './data/Lib.Dao', './data/Lib.Basic', './data/Lib.Helper', './data/Lib.Search'],

    function (N, DAO, Basic, Helper, Search) {

        const { log, redirect, runtime } = N;
        const { serverWidget } = N.ui;

        /******************/

        var formContext = {
            dao: null,
            form: null,
            params: {}
        }

        const SUITELET_RECORD = {
            title: 'custpage_report_title',
            titleDetail: 'custpage_report_title_detail',
            groups: {
                main: 'custpage_report_group_criteria_1',
                criteria: 'custpage_report_group_criteria_2'
            },
            fields: {
                subsidiary: 'custpage_report_criteria_subsidiary',
                dateFrom: 'custpage_report_criteria_date_from',
                dateTo: 'custpage_report_criteria_date_to',
                vendor: 'custpage_report_criteria_vendor',
                ruc: 'custpage_report_criteria_ruc',
                currency: 'custpage_report_criteria_currency',
                type: 'custpage_report_criteria_type',
                status: 'custpage_report_criteria_status',
                balance: 'custpage_report_criteria_balance'
            },
            buttons: {
                generate: 'custpage_report_button_visualize',
                exportXLS: 'custpage_report_button_export_xls',
                exportCSV: 'custpage_report_button_export_csv'
            }
        }

        function setInput(params) {
            // Recibir datos - multiselect 'Estado'
            if (params['status']) {
                params['status'] = params['status'].split('|'); // 'VendBill:A|VendBill:B|Custom122:A' -> ['VendBill:A','VendBill:B','Custom122:A']
            }

            log.debug('Input.Report', params);
            formContext.params = params;
        }

        function selectedReport() {
            log.debug('selectedReport', formContext.params.report);
            return Number(formContext.params.report);
        }

        /**
         * description : Create Basic Form, add buttons and client script
         */
        function createReportForm() {

            formContext.dao = new DAO();
            formContext.form = serverWidget.createForm({
                title: formContext.dao.get(SUITELET_RECORD.title)
            });

            formContext.form.addSubmitButton({
                label: formContext.dao.get(SUITELET_RECORD.buttons.generate)
            });

            formContext.form.clientScriptModulePath = '../Bio.ClientScript.ReporteCtaCorrienteProv'

            // formContext.form.addButton({
            //     id: SUITELET_RECORD.buttons.exportXLS,
            //     label: formContext.dao.get(SUITELET_RECORD.buttons.exportXLS),
            //     functionName: 'exportToExcel()'
            // });
        }

        /**
         * description : Create Basic Form
         */
        function createReportDetailForm() {
            formContext.dao = new DAO();
            formContext.form = serverWidget.createForm({
                title: formContext.dao.get(SUITELET_RECORD.titleDetail),
                hideNavBar: false
            });
        }

        /**
         * description : create criteria Fields
         */
        function createCriteriaGroup() {

            // Criteria Group
            let group = formContext.form.addFieldGroup({
                id: SUITELET_RECORD.groups.criteria,
                label: formContext.dao.get(SUITELET_RECORD.groups.criteria),
            });

            // Subsidiary Field
            let subsidiaryField = formContext.form.addField({
                id: SUITELET_RECORD.fields.subsidiary,
                label: formContext.dao.get(SUITELET_RECORD.fields.subsidiary),
                type: 'select',
                source: 'subsidiary',
                container: SUITELET_RECORD.groups.criteria
            });
            subsidiaryField.updateBreakType({ breakType: 'STARTCOL' })
            subsidiaryField.isMandatory = true;

            if (formContext.params.subsidiary) {
                subsidiaryField.defaultValue = formContext.params.subsidiary;
            }

            // DateFrom Field
            let dateFromField = formContext.form.addField({
                id: SUITELET_RECORD.fields.dateFrom,
                label: formContext.dao.get(SUITELET_RECORD.fields.dateFrom),
                type: 'date',
                container: SUITELET_RECORD.groups.criteria
            });
            dateFromField.updateBreakType({ breakType: 'STARTROW' })
            dateFromField.isMandatory = true;

            if (formContext.params.dateFrom) {
                dateFromField.defaultValue = formContext.params.dateFrom;
            }

            // DateTo Field
            let dateToField = formContext.form.addField({
                id: SUITELET_RECORD.fields.dateTo,
                label: formContext.dao.get(SUITELET_RECORD.fields.dateTo),
                type: 'date',
                container: SUITELET_RECORD.groups.criteria
            });
            dateToField.updateBreakType({ breakType: 'STARTROW' })
            dateToField.isMandatory = true;

            if (formContext.params.dateTo) {
                dateToField.defaultValue = formContext.params.dateTo;
            }

            // Vendor Field
            let vendorField = formContext.form.addField({
                id: SUITELET_RECORD.fields.vendor,
                label: formContext.dao.get(SUITELET_RECORD.fields.vendor),
                type: 'select',
                source: 'vendor',
                container: SUITELET_RECORD.groups.criteria
            });
            vendorField.updateBreakType({ breakType: 'STARTCOL' })
            // vendorField.isMandatory = true;

            if (formContext.params.vendor) {
                vendorField.defaultValue = formContext.params.vendor;
            }

            // RUC Field
            let rucField = formContext.form.addField({
                id: SUITELET_RECORD.fields.ruc,
                label: formContext.dao.get(SUITELET_RECORD.fields.ruc),
                type: 'text',
                container: SUITELET_RECORD.groups.criteria
            });
            rucField.updateBreakType({ breakType: 'STARTROW' })
            // rucField.updateDisplaySize({ height: 60, width: 12 });
            // vendorField.isMandatory = true;

            if (formContext.params.ruc) {
                rucField.defaultValue = formContext.params.ruc;
            }

            // Currency Field
            let currencyField = formContext.form.addField({
                id: SUITELET_RECORD.fields.currency,
                label: formContext.dao.get(SUITELET_RECORD.fields.currency),
                type: 'select',
                source: 'currency',
                container: SUITELET_RECORD.groups.criteria
            });
            currencyField.updateBreakType({ breakType: 'STARTCOL' })
            // currencyField.updateDisplaySize({ height: 60, width: 120 });
            // vendorField.isMandatory = true;

            if (formContext.params.currency) {
                currencyField.defaultValue = formContext.params.currency;
            }

            // Type Field
            let typeFormField = formContext.form.addField({
                id: SUITELET_RECORD.fields.type,
                label: formContext.dao.get(SUITELET_RECORD.fields.type),
                type: 'select',
                container: SUITELET_RECORD.groups.criteria
            });
            typeFormField.updateBreakType({ breakType: 'STARTROW' })
            // typeFormField.updateDisplaySize({ height: 60, width: 120 });
            // viewFormField.isMandatory = true;

            typeFormField.addSelectOption({ value: '', text: '' });
            for (var key in Basic.STATIC_DATA.typeForm) {
                typeFormField.addSelectOption({ value: key, text: Basic.STATIC_DATA.typeForm[key] })
            }

            if (formContext.params.type) {
                typeFormField.defaultValue = formContext.params.type;
            }

            // Status Field
            let statusFormField = formContext.form.addField({
                id: SUITELET_RECORD.fields.status,
                label: formContext.dao.get(SUITELET_RECORD.fields.status),
                type: 'multiselect',
                container: SUITELET_RECORD.groups.criteria
            });
            statusFormField.updateBreakType({ breakType: 'STARTCOL' })
            statusFormField.updateDisplaySize({ height: 4, width: 320 });
            // viewFormField.isMandatory = true;

            statusFormField.addSelectOption({ value: '', text: '' });
            for (var key in Basic.STATIC_DATA.statusForm) {
                statusFormField.addSelectOption({ value: key, text: Basic.STATIC_DATA.statusForm[key] })
            }

            if (formContext.params.status) {
                statusFormField.defaultValue = formContext.params.status;
            }

            // Balance Field (Saldo)
            let balanceFormField = formContext.form.addField({
                id: SUITELET_RECORD.fields.balance,
                label: formContext.dao.get(SUITELET_RECORD.fields.balance),
                type: 'select',
                container: SUITELET_RECORD.groups.criteria
            });
            balanceFormField.updateBreakType({ breakType: 'STARTCOL' })
            // typeFormField.updateDisplaySize({ height: 60, width: 120 });
            // viewFormField.isMandatory = true;

            balanceFormField.addSelectOption({ value: '', text: '' });
            for (var key in Basic.STATIC_DATA.balanceForm) {
                balanceFormField.addSelectOption({ value: key, text: Basic.STATIC_DATA.balanceForm[key] })
            }

            if (formContext.params.balance) {
                balanceFormField.defaultValue = formContext.params.balance;
            }
        }

        /**
         * Create HTML Container Field
         */
        function createViewerModel(htmlReport) {

            let viewerModelField = formContext.form.addField({
                id: 'custpage_report_viewer_html',
                label: ' ',
                type: 'inlinehtml'
            });
            viewerModelField.updateLayoutType({
                layoutType: serverWidget.FieldLayoutType.OUTSIDEBELOW
            });

            let htmlContainer = new String();
            htmlContainer = htmlContainer.concat(Helper.getDefaultStyle());
            htmlContainer = htmlContainer.concat(htmlReport);
            viewerModelField.defaultValue = htmlContainer;
        }

        /**
         * Return form
         */
        function getForm() {
            return formContext.form;
        }

        /**
         * Redirect to the same suitelet
         */
        function loadReportForm(params) {

            let getParams = {};
            for (var x in SUITELET_RECORD.fields) {
                let value = params[SUITELET_RECORD.fields[x]];
                if (value) {
                    getParams[x] = value;
                }
            }
            getParams['report'] = 1;

            // Enviar datos
            if (getParams['ruc']) {
                getParams['ruc'] = getParams['ruc'].trim();
                getParams['vendor'] = Helper.getVendorIdByRuc(getParams['ruc']);
            }

            // Enviar datos - multiselect 'Estado'
            if (getParams['status']) {
                getParams['status'] = getParams['status'].split('\u0005').join('|'); // 'VendBill:A\u0005VendBill:B\u0005Custom122:A' -> 'VendBill:A|VendBill:B|Custom122:A'
            }

            redirect.toSuitelet({
                scriptId: runtime.getCurrentScript().id,
                deploymentId: runtime.getCurrentScript().deploymentId,
                parameters: getParams
            });
        }

        return {
            setInput,
            selectedReport,
            createReportForm,
            createReportDetailForm,
            createCriteriaGroup,
            createViewerModel,
            getForm,
            loadReportForm
        }

    });
