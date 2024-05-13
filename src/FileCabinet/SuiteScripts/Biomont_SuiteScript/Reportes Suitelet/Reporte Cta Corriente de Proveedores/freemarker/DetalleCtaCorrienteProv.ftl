<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
    xmlns:html="http://www.w3.org/TR/REC-html40">
    <ss:Styles>
        <ss:Style ss:ID="header">
            <ss:Alignment ss:Horizontal="Left" />
            <ss:Font ss:Bold="1" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
        </ss:Style>
        <ss:Style ss:ID="header-red">
            <ss:Alignment ss:Horizontal="Left" />
            <ss:Font ss:Bold="1" ss:Color="#ff0000" />
        </ss:Style>
        <ss:Style ss:ID="t1">
            <#--  <ss:Alignment ss:Horizontal="Left" />  -->
            <ss:Font ss:Bold="1" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <ss:Interior ss:Color="#E0E6EF" ss:Pattern="Solid" />
            <NumberFormat ss:Format="0.00" />
        </ss:Style>
        <ss:Style ss:ID="t1-percent">
            <ss:Font ss:Bold="1" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <ss:Interior ss:Color="#E0E6EF" ss:Pattern="Solid" />
            <NumberFormat ss:Format="0%" />
        </ss:Style>
        <ss:Style ss:ID="t1-number">
            <ss:Font ss:Bold="1" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <ss:Interior ss:Color="#E0E6EF" ss:Pattern="Solid" />
        </ss:Style>
        <ss:Style ss:ID="t1-currency">
            <ss:Font ss:Bold="1" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <ss:Interior ss:Color="#E0E6EF" ss:Pattern="Solid" />
            <NumberFormat ss:Format="Currency" />
        </ss:Style>
        <ss:Style ss:ID="t1-currency-0decimals">
            <ss:Font ss:Bold="1" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <ss:Interior ss:Color="#E0E6EF" ss:Pattern="Solid" />
            <NumberFormat ss:Format="S/ #,##0" /> <!-- Alternativa a "Currency" para eliminar decimales -->
        </ss:Style>
        <ss:Style ss:ID="background">
            <Alignment ss:Horizontal="Right" ss:Vertical="Bottom" />
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FFFFFF" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FFFFFF" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FFFFFF" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#FFFFFF" />
            </Borders>
        </ss:Style>
        <ss:Style ss:ID="cell">
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <NumberFormat ss:Format="0.00" />
        </ss:Style>
        <ss:Style ss:ID="cell-percent">
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <NumberFormat ss:Format="0%" />
        </ss:Style>
        <ss:Style ss:ID="cell-currency">
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <NumberFormat ss:Format="Currency" />
        </ss:Style>
        <ss:Style ss:ID="cell-currency-0decimals">
            <Borders>
                <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
                <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#DCDCDC" />
            </Borders>
            <NumberFormat ss:Format="S/ #,##0" /> <!-- Alternativa a "Currency" para eliminar decimales -->
        </ss:Style>
    </ss:Styles>
    <Worksheet ss:Name="Reporte Comparativo">
        <Table ss:StyleID="background">

            <!-- Tamaño de columnas -->
            <Column ss:Width="200" />
            <Column ss:Width="90" />
            <Column ss:Width="90" />
            <Column ss:Width="90" />
            <Column ss:Width="90" />
            <Column ss:Width="90" />
            <Column ss:Width="90" />
            <Column ss:Width="90" />
            <Column ss:Width="90" />
            <Column ss:Width="90" />
            <Column ss:Width="90" />
            <Row>
            </Row>

            <!-- Inicio de presentacion -->
            <Row>
                <Cell ss:StyleID="header-red">
                    <Data ss:Type="String">LABORATORIOS BIOMONT S.A.</Data>
                </Cell>
            </Row>
            <Row>
                <Cell ss:StyleID="header">
                    <Data ss:Type="String">Presentacion :</Data>
                </Cell>
                <Cell ss:StyleID="cell" ss:MergeAcross="2">
                    <Data ss:Type="String">${context.name}</Data>
                </Cell>
            </Row>
            <Row>
                <Cell ss:StyleID="header">
                    <Data ss:Type="String">Periodo :</Data>
                </Cell>
                <Cell ss:StyleID="cell" ss:MergeAcross="2">
                    <Data ss:Type="String">${context.period}</Data>
                </Cell>
            </Row>
            <Row>
            </Row>

            <!-- Inicio de cabecera (tabla) -->
            <Row>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">MES</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">FECHA</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">PERIODO</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">CLIENTE</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">DOC</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">N. DOC</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">CODIGO</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">VENTA</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">DSCTO</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">V. NETA</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">% Dscto</Data>
                </Cell>
            </Row>

            <!-- Inicio de cuerpo (tabla) -->
            <#list context.transactions.dataDescuentoVtas.detalle as transaction>
                <#assign importe_bruto_soles = transaction.importe_bruto_soles>
                <#assign descuento = transaction.descuento>
                <#assign importe_neto_soles = transaction.importe_neto_soles>

                <#if (importe_bruto_soles == 0)>
                    <#assign porcentaje = 0>
                <#else>
                    <#--  <#assign porcentaje = (descuento * 100) / importe_bruto_soles>  -->
                    <#assign porcentaje = descuento / importe_bruto_soles>
                </#if>

                <!-- Problema con el nombre de cliente -->
                <#assign cliente = transaction.cliente?replace("&", "&amp;")?replace("<", "&lt;")?replace(">", "&gt;")>

                <Row>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="String">${transaction.mes_nombre}</Data>
                    </Cell>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="String">${transaction.fecha}</Data>
                    </Cell>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="String">${transaction.periodo_contable_nombre}</Data>
                    </Cell>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="String">${cliente}</Data>
                    </Cell>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="String">${transaction.ns_tipo_documento.nombre}</Data>
                    </Cell>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="String">${transaction.numero_documento}</Data>
                    </Cell>
                    <Cell ss:StyleID="cell">
                        <Data ss:Type="String">${transaction.articulo.codigo}</Data>
                    </Cell>
                    <Cell ss:StyleID="cell-currency">
                        <Data ss:Type="Number">${importe_bruto_soles}</Data>
                    </Cell>
                    <Cell ss:StyleID="cell-currency">
                        <Data ss:Type="Number">${descuento}</Data>
                    </Cell>
                    <Cell ss:StyleID="cell-currency">
                        <Data ss:Type="Number">${importe_neto_soles}</Data>
                    </Cell>
                    <Cell ss:StyleID="cell-percent">
                        <Data ss:Type="Number">${porcentaje}</Data>
                    </Cell>
                </Row>
            </#list>

            <!-- Inicio pie (tabla) -->
            <#assign totales = context.transactions.dataDescuentoVtas.totales>

            <#if (totales.importe_bruto_soles == 0)>
                <#assign porcentaje_total = 0>
            <#else>
                <#--  <#assign porcentaje_total = (totales.descuento * 100) / totales.importe_bruto_soles>  -->
                <#assign porcentaje_total = totales.descuento / totales.importe_bruto_soles>
            </#if>

            <Row>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">Totales</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String"></Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String"></Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String"></Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String"></Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String"></Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String"></Data>
                </Cell>
                <Cell ss:StyleID="t1-currency-0decimals">
                    <Data ss:Type="Number">${totales.importe_bruto_soles}</Data>
                </Cell>
                <Cell ss:StyleID="t1-currency-0decimals">
                    <Data ss:Type="Number">${totales.descuento}</Data>
                </Cell>
                <Cell ss:StyleID="t1-currency-0decimals">
                    <Data ss:Type="Number">${totales.importe_neto_soles}</Data>
                </Cell>
                <Cell ss:StyleID="t1-percent">
                    <Data ss:Type="Number">${porcentaje_total}</Data>
                </Cell>
            </Row>
            <Row>
            </Row>

        </Table>
    </Worksheet>
</Workbook>