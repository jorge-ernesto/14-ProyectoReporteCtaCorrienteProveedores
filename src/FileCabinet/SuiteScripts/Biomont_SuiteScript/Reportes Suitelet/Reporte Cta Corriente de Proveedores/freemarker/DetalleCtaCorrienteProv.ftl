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
            <#--  <NumberFormat ss:Format="Currency" />  -->
            <NumberFormat ss:Format="#,##0.00" />
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
        <ss:Style ss:ID="t1-totales">
            <ss:Alignment ss:Horizontal="Right" />
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
        <ss:Style ss:ID="t1-center">
            <ss:Alignment ss:Horizontal="Center" />
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
            <#--  <NumberFormat ss:Format="Currency" />  -->
            <NumberFormat ss:Format="#,##0.00" />
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
                    <Data ss:Type="String">Fecha :</Data>
                </Cell>
                <Cell ss:StyleID="cell" ss:MergeAcross="2">
                    <Data ss:Type="String">Del ${context.dateFrom} al ${context.dateTo}</Data>
                </Cell>
            </Row>
            <!--
            <Row>
                <Cell ss:StyleID="header">
                    <Data ss:Type="String">Año :</Data>
                </Cell>
                <Cell ss:StyleID="cell" ss:MergeAcross="2">
                    <Data ss:Type="String">${context.year}</Data>
                </Cell>
            </Row>
            <Row>
                <Cell ss:StyleID="header">
                    <Data ss:Type="String">Mes :</Data>
                </Cell>
                <Cell ss:StyleID="cell" ss:MergeAcross="2">
                    <Data ss:Type="String">${context.month}</Data>
                </Cell>
            </Row>
            -->
            <Row>
            </Row>

            <!-- Inicio de cabecera (tabla) -->
            <Row>
                <Cell ss:StyleID="t1" ss:MergeAcross="9">
                    <Data ss:Type="String"></Data>
                </Cell>
                <Cell ss:StyleID="t1-center" ss:MergeAcross="4">
                    <Data ss:Type="String">PAGOS</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String"></Data>
                </Cell>
            </Row>
            <Row>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">T/D</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">NS T/D</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">N. DOCUMENTO</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">RUC</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">PROVEEDOR</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">FECHA REG.</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">FECHA DOC.</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">FECHA VCTO.</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">MONEDA</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">IMPORTE</Data>
                </Cell>

                <!-- Pagos -->
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">BANCO</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">TIPO DE TRANSACCIÓN</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">NUMERO DE TRANSACCIÓN</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">FECHA DE TRANSACCIÓN</Data>
                </Cell>
                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">IMPORTE DE TRANSACCIÓN</Data>
                </Cell>
                <!-- Fin Pagos -->

                <Cell ss:StyleID="t1">
                    <Data ss:Type="String">SALDO</Data>
                </Cell>
            </Row>

            <!-- Inicio de cuerpo (tabla) -->
            <#list context.transactions.proveedores as keyprov, proveedores>
                <!--
                <Row>
                    <Cell ss:StyleID="t1" ss:MergeAcross="13">
                        <Data ss:Type="String">PROVEEDOR: ${keyprov}</Data>
                    </Cell>
                </Row>
                -->
                <#list proveedores.detalle as documentos>
                    <Row>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String">${documentos.tipo.nombre}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String">${documentos.ns_tipo_documento.nombre}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String">${documentos.numero_documento}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String">${documentos.proveedor.ruc}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String">${documentos.proveedor.nombre}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String">${documentos.fecha_registro}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String">${documentos.fecha_emision}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String">${documentos.fecha_vencimiento}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String">${documentos.moneda.nombre}</Data>
                        </Cell>
                        <Cell ss:StyleID="cell-currency">
                            <Data ss:Type="Number">${documentos.importe_bruto_me}</Data>
                        </Cell>

                        <!-- Pagos -->
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String"></Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String"></Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String"></Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String"></Data>
                        </Cell>
                        <Cell ss:StyleID="cell">
                            <Data ss:Type="String"></Data>
                        </Cell>
                        <!-- Fin Pagos -->

                        <Cell ss:StyleID="cell-currency">
                            <Data ss:Type="Number">${documentos.importe_saldo_me}</Data>
                        </Cell>
                    </Row>
                    <#list documentos.pagos_registros_relacionados as regrel>
                        <Row>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>

                            <!-- Pagos -->
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String">${regrel.banco.nombre}</Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String">${regrel.tipo.nombre}</Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String">${regrel.numero_documento}</Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String">${regrel.fecha}</Data>
                            </Cell>
                            <Cell ss:StyleID="cell-currency">
                                <Data ss:Type="Number">${regrel.pago}</Data>
                            </Cell>
                            <!-- Fin Pagos -->

                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                        </Row>
                    </#list>
                    <#if (documentos.pagos_detraccion.es_detraccion == 'T' && documentos.pagos_detraccion.es_autodetraccion == 'F')>
                        <Row>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>

                            <!-- Pagos -->
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String">${documentos.pagos_detraccion.banco.nombre}</Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String">${documentos.pagos_detraccion.tipo.nombre}</Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String">${documentos.pagos_detraccion.numero_documento}</Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String">${documentos.pagos_detraccion.fecha}</Data>
                            </Cell>
                            <Cell ss:StyleID="cell-currency">
                                <Data ss:Type="Number">${documentos.pagos_detraccion.pago}</Data>
                            </Cell>
                            <!-- Fin Pagos -->

                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                        </Row>
                    </#if>
                    <#list documentos.pagos_letrasxpagar as lxp>
                        <Row>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>

                            <!-- Pagos -->
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String">${lxp.banco.nombre}</Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String">${lxp.tipo.nombre}</Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String">${lxp.numero_documento}</Data>
                            </Cell>
                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String">${lxp.fecha}</Data>
                            </Cell>
                            <Cell ss:StyleID="cell-currency">
                                <Data ss:Type="Number">${lxp.pago}</Data>
                            </Cell>
                            <!-- Fin Pagos -->

                            <Cell ss:StyleID="cell">
                                <Data ss:Type="String"></Data>
                            </Cell>
                        </Row>
                    </#list>
                    <Row>
                        <Cell ss:StyleID="t1-totales">
                            <Data ss:Type="String"></Data>
                        </Cell>
                        <Cell ss:StyleID="t1-totales">
                            <Data ss:Type="String"></Data>
                        </Cell>
                        <Cell ss:StyleID="t1-totales">
                            <Data ss:Type="String"></Data>
                        </Cell>
                        <Cell ss:StyleID="t1-totales">
                            <Data ss:Type="String"></Data>
                        </Cell>
                        <Cell ss:StyleID="t1-totales">
                            <Data ss:Type="String"></Data>
                        </Cell>
                        <Cell ss:StyleID="t1-totales">
                            <Data ss:Type="String"></Data>
                        </Cell>
                        <Cell ss:StyleID="t1-totales">
                            <Data ss:Type="String"></Data>
                        </Cell>
                        <Cell ss:StyleID="t1-totales">
                            <Data ss:Type="String"></Data>
                        </Cell>
                        <Cell ss:StyleID="t1-totales">
                            <Data ss:Type="String"></Data>
                        </Cell>
                        <Cell ss:StyleID="t1-totales">
                            <Data ss:Type="String"></Data>
                        </Cell>

                        <!-- Pagos -->
                        <Cell ss:StyleID="t1-totales">
                            <Data ss:Type="String"></Data>
                        </Cell>
                        <Cell ss:StyleID="t1-totales">
                            <Data ss:Type="String"></Data>
                        </Cell>
                        <Cell ss:StyleID="t1-totales">
                            <Data ss:Type="String"></Data>
                        </Cell>
                        <Cell ss:StyleID="t1-totales">
                            <Data ss:Type="String">TOTAL PAGOS</Data>
                        </Cell>
                        <Cell ss:StyleID="t1-currency">
                            <Data ss:Type="Number">${documentos.importe_pagado_me}</Data>
                        </Cell>
                        <!-- Fin Pagos -->

                        <Cell ss:StyleID="t1-totales">
                            <Data ss:Type="String"></Data>
                        </Cell>
                    </Row>
                    <Row>
                    </Row>
                </#list>
            </#list>

            <#list context.transactions.totales as keytot, totales>
                <Row>
                    <Cell ss:StyleID="t1-totales" ss:MergeAcross="8">
                        <Data ss:Type="String">TOTAL ${keytot}</Data>
                    </Cell>
                    <Cell ss:StyleID="t1-currency">
                        <Data ss:Type="Number">${totales.importe_bruto_me}</Data>
                    </Cell>
                    <Cell ss:StyleID="t1-totales">
                        <Data ss:Type="String"></Data>
                    </Cell>
                    <Cell ss:StyleID="t1-totales">
                        <Data ss:Type="String"></Data>
                    </Cell>
                    <Cell ss:StyleID="t1-totales">
                        <Data ss:Type="String"></Data>
                    </Cell>
                    <Cell ss:StyleID="t1-totales">
                        <Data ss:Type="String"></Data>
                    </Cell>
                    <Cell ss:StyleID="t1-currency">
                        <Data ss:Type="Number">${totales.importe_pagado_me}</Data>
                    </Cell>
                    <Cell ss:StyleID="t1-currency">
                        <Data ss:Type="Number">${totales.importe_saldo_me}</Data>
                    </Cell>
                </Row>
            </#list>

        </Table>
    </Worksheet>
</Workbook>