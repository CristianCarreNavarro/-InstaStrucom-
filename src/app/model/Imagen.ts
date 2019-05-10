export class Imagen {
    public   url: string;
    
    public    etiqueta: string;
    public    coordenadas: string;
    
    public  base64;
       constructor( url="",base64="",etiqueta:string="",coordenadas:string=""){
        
           this.url = url;
           this.base64 = base64;
           this.etiqueta = etiqueta;
           this.coordenadas = coordenadas;
       }

   }