[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#links)


# Partiendo PDF publicado por el Ayuntamiento
![alt text](https://res.cloudinary.com/dabrencx7/image/upload/v1629010030/Presupuestos/ingresosPDF_i7wjvv.png)
![alt text](https://res.cloudinary.com/dabrencx7/image/upload/v1628963150/Presupuestos/gastosPDF_g6uhql.png)

- Convertir a Excel con Foxit.
- Utilizar conversor online. El ultimo utilizado es el de [Adobe](https://documentcloud.adobe.com/link/acrobat/pdf-to-excel?x_api_client_id=adobe_com&x_api_client_location=pdf_to_excel)
- Alternativa para no tener que registrarse https://www.ilovepdf.com/pdf_to_excel

- Crear carpeta OCM debajo de la carpeta donde es el fichero a convertir.
- Grabar fichero generado en la carpeta OCM.
- Abrir fichero Excel.
- Grabar como xlsm para permitir usar macros.
- En Vista ->Macros->Ver macros-> Borrar el codigo que existe. Grabar nueva macros con todo el código siguiente:

Sub borrarSuma()
For Each Fila In Selection
If Fila.Value = "Suma" Then
Fila.EntireRow.Delete
End If
Next Fila
End Sub

Sub borrarIniciales()
For Each Fila In Selection
If Fila.Value = "INICIALES" Then
Fila.EntireRow.Delete
End If
Next Fila
End Sub

Sub borrarDescripcion()
For Each Fila In Selection
If Fila.Value = "DESCRIPCIÓN" Then
Fila.EntireRow.Delete
End If
Next Fila
End Sub

Sub BorrarLineaVacia()
For Each Fila In Selection
If Fila.Value = Empty Then
Fila.EntireRow.Delete
End If
Next Fila
End Sub

Sub concatenar()
For Each fila In Selection
 fila.Activate
If fila.Value = Empty Then
    ActiveCell.Offset(0, 2).Activate
    ActiveCell.Value = "=CONCAT(RC[-1],"" "",R[1]C[-1])"
Else
  ActiveCell.Offset(0, 1).Activate
previo = ActiveCell.Value
    ActiveCell.Offset(0, 1).Activate
    ActiveCell.Value = previo
End If
Next fila
End Sub


Sub concatenarIzda()
salto = 0
For Each fila In Selection
    'ActiveCell.Offset(salto, 0).Activate
    'fila.Activate
    ' MsgBox ActiveCell.Address
    
    'If Not IsEmpty(ActiveCell) Then
    ActiveCell.Offset(0, -2).Activate
    previo = CStr(ActiveCell.Value)
    ActiveCell.Offset(0, 1).Activate
    ActiveCell.Value = previo
   ' MsgBox ActiveCell.Address
    ActiveCell.Offset(1, 1).Activate
    salto = salto + 1
   ' End If
         ' MsgBox ActiveCell.Address
    
    If ActiveCell.Value = Empty Then
        ActiveCell.Offset(0, -2).Activate
        previo1 = CStr(ActiveCell.Value)
        'MsgBox ActiveCell.Address
         ActiveCell.Offset(-1, 1).Activate
         ActiveCell.Value = previo + " " + previo1
        'MsgBox ActiveCell.Address
         ActiveCell.Offset(2, 1).Activate
          salto = salto + 1
         'MsgBox ActiveCell.Address
          
          If ActiveCell.Value = Empty Then
               ActiveCell.Offset(0, -2).Activate
               previo2 = CStr(ActiveCell.Value)
               'MsgBox ActiveCell.Address
               ActiveCell.Offset(-2, 1).Activate
               ActiveCell.Value = previo + " " + previo1 + " " + previo2
               'MsgBox ActiveCell.Address
               ActiveCell.Offset(3, 1).Activate
                salto = salto + 1
               'MsgBox ActiveCell.Address
          End If
          
    End If
 
Next fila
End Sub


- Grabar macros.
- Ejecutar macro **borrarSuma** seleccionando la columna adecuada (la que contine la palabra Suma) **columna D**.
- Ejecutar macro **borrarIniciales** seleccionando la columna adecuada (la que contine la palabra INICIALES)  **columna E**.
- Ejecutar macro **borrarDescripcion** seleccionando la columna adecuada (la que contine la palabra DESCRIPCIÓN)  **columna D**.
- Ejecutar macro **BorrarLineaVacia** seleccionando  **el rango que contiene texto** de la **columna B**. 

.- Copiar formato correcto a columnas que tengas celdas combinadas.
- Comprobar que los totales coinciden con el PDF de origen.

- Insertar 5 columna desde columna D
- Abrir Excel año anterior
- Copiar y pegar primera fila.
- Copiar y pegar formulas columnas D-H inclusive.
- Revisar año de las tablas usar en las formulas.



- Buscar #N/D
- Problemas para convertir a numero, el numero esta como texto.
- Lo copio a la izquierda multiplicando por 1.
- Las pongo como numero, decimales=0, sin separador de miles.
- Los porcentajes = porcentaje, dos decimales.
- Copio el rango completo y lo pego como valor en el rango original.

- 



# Partiendo Excel publicado por el Ayuntamiento
- Abrir Excel original
- Guardar en carpeta OCM.
- Guardar como xlsx (version más reciente de Excel)
- Eliminar 2ª fila de cabecera, la que asigna letras a las columnas (a), (b) c=a+b ............
- Eliminar fila totales.
- eliminar columnas:
    - C.Gestor
    - Saldo de Créditos Retenidos pdtes de utilización
    - Saldo de Créditos Retenidos para Trans.
    - Saldo de Acuerd. Créd. para No Disponibil.
    - Saldo de Gastos Autorizados
    - Saldo de Pagos Ordenados
    - Total gastado
    - Saldo de Créditos disponibles
    - Saldo de Créditos disp. a nivel de Vinculación
    - % de Realizacion del Presupuesto
    - Facturas consumen disp. Pend. Contabilizar
    - Gastado en Fase Definitiva
    
- Renombrar

        ⋅⋅⋅Org. -> CodOrg
        ⋅⋅⋅Pro. -> CodPro
        ⋅⋅⋅Eco. -> CodEco

- Añadir columnas:

        ⋅⋅⋅CodCap
        ⋅⋅⋅DesCap
        ⋅⋅⋅DesOrg
        ⋅⋅⋅DesPro
        ⋅⋅⋅DesEco

- Cambiar a tipo numero, 0 decimales, sin separador de miles, las columnas:
CodOrg hay que convertir a num ero evitando el doble caracter 00, 01, 02 ....   Multiplicar por 1 y copiar como valor.

        ⋅⋅⋅CodOrg
        ⋅⋅⋅CodPro
        ⋅⋅⋅CodEco
        ⋅⋅⋅CodCap

- Extraer primer caracter de "Eco." en columna creada CodCap. =IZQUIERDA(D2;1)
- Abrir Tabla organicos 2020.xlsx
- formula BUSCARV(VALOR(X)......;2;0). importante añadir VALOR()
- Es importante que el ultimo valor sea 0 para que sea busqueda exacta y en caso de faltar algun valor en la tabla de #N/D

- Hacer lo mismo para DesCap, DesEco y DesPro abriendo sus correspondientes ficheros.

- **HAY QUE UNIFICAR TODOS LOS NOMBRES IGUAL PARA PERMITIR UN SOLO PROYECTO DONDE SE SELECCIONE EL AÑO A MOSTRAR**.
    "CodOrg"
    "CodPro"
    "CodEco"
    "CodCap"
    "DesCap"
    "DesOrg"
    "DesPro"
    "DesEco"
    "Descripcion"
    "Iniciales"
    "Modificaciones"
    "Definitivas"
    "GastosComprometidos"
    "ObligacionesReconocidasNetas"
    "Pagos"
    "ObligacionesPendientePago"
    "RemanenteCredito"

- Cambiar nombres que contengan un . de lo contrario no se muestran los valores en ag-grid.
- Saldo de Gastos Compromet. => Saldo de Gastos Comprometidos
- Facturas consumen disp. Pend. Contabilizar => Facturas consumen disp Pend Contabilizar
- Saldo de Acuerd. Créd. para No Disponibil. => Saldo de Acuerdo Créditos para No Disponibilidad
- Saldo de Créditos Retenidos para Trans. => Saldo de Créditos Retenidos para Trans
- Saldo de Créditos disp. a nivel de Vinculación => Saldo de Créditos disp a nivel de vinculación
- Grabar.

- Archivo->guardar como->desplegable tipo archivo-> CSV UTF-8 (delimitado por comas) (\*.csv)
- Si no se hace como UTF-8 el json contendra simbolos extraños.  
- Guardar como 2020LiqGas
- En el CSV generado revisar todas las columnas numericas.
- Revisar formato columna CodOrg debe ser numnerico sin decimales ni separación de miles.
- 




**\*\***\*\*\***\*\*** INGRESOS **\*\*\*\***\*\*\*\***\*\*\*\***

- Insertar 3 columnas a partir columan C.
- Copiar primera fila Excel anterior.
- Copiar formulas 3 nuevas columnas a partir columna B.
- Es importante que el ultimo valor sea 0 para que sea busqueda exacta y en caso de faltar algun valor en la tabla de #N/D
- Comprobar #N/D.
- Cambiar formato columnas F a O inclusive para que en alineación no haya nada combinado.
- Copiar Cabecera columnas F a O inclusive y pegar a partir de Q
- Multiplicar * 1 columnas F a O inclusive.
- Copiar el rango y pegarlo como valor en F a O inclusive.
- Borrar a partir de Q.
- Cambiar formato a numerico sin decimales ni separador de miles columnas A y D
- Archivo->guardar como->desplegable tipo archivo-> CSV UTF-8 (delimitado por comas) (\*.csv)
- Si no se hace como UTF-8 el json contendra simbolos extraños.  
- Cambiar nombre Iiniciales y DerechoisCancelados.
- Guardar. 
- En el CSV generado revisar todas las columnas numericas.
- Las pongo como numero, decimales=0, sin separador de miles.
- Los porcentajes = porcentaje, dos decimales.

**\*\*\*\***\*\*\*\***\*\*\*\*** ANGULAR ****\*\*\*\*****\*\*****\*\*\*\*****\*\*\*****\*\*\*\*****\*\*****\*\*\*\*****
- Copio y pego carpeta anterior.
- Renombro carpeta
- Renombro todas las cadenas del nombre anterior con el actual
- Da problemas con el nombre del repositorio, conserva el anterior.
- Borro carpeta .git, abriendo consola de git y haciendo rm -rf .git

\***\*\*\*\*\***\*\***\*\*\*\*\*** GENERAR JSON ****\*\*****\*\*****\*\*****\*\*\*****\*\*****\*\*****\*\*****
- https://www.csvjson.com/csv2json
- Options: Parse numbers y array.
- Download.
- Si esta abierto VS Code lo abre en el..
- Tambien lo pone en C>:...Download
- Lo genera con el nombre csvjson.json
- Guardar como desde VS Code.
- Le cambio el nombre = al csv
- Copiarlo a src/assets de la app
- Cambiar nombres en :

        ⋅⋅⋅..\src\app\layouts\global-constants.ts
        ⋅⋅⋅public static jsonGastos = '../../../assets/data/20201215EjeGas.json';
        ⋅⋅⋅public static jsonIngresos = '../../../assets/data/20201215EjeIng.json';

- Anteriormente se usaban ficheros alojados en Digital Ocean.
- Ultimo proyecto con comentarios referidos a esto: ocmpre2020eje20201215
