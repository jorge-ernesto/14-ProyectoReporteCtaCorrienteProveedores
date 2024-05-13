/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N', './lib/data/Lib.Search'],

    function (N, SearchMe) {

        const FIELDS = {
            vendor: 'custpage_report_criteria_vendor',
            ruc: 'custpage_report_criteria_ruc'
        }

        /**
         * Function to be executed after page is initialized.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
         *
         * @since 2015.2
         */
        function pageInit(scriptContext) {

        }

        /**
         * Function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @since 2015.2
         */
        function fieldChanged(scriptContext) {

            if (scriptContext.fieldId == FIELDS.vendor) {

                // Limpiar RUC
                scriptContext.currentRecord.setValue(FIELDS.ruc, '');
            }
        }

        function exportToExcel() {

            const xlsHref = window.location.href + '&xls=T';

            const a = document.createElement('a');
            a.href = xlsHref;

            // Añade el enlace al documento y haz clic en él para descargar
            document.body.appendChild(a);
            a.click();

            // Limpia el objeto URL y elimina el enlace
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }

        return {
            pageInit: pageInit,
            fieldChanged: fieldChanged,
            exportToExcel: exportToExcel
        };

    });
