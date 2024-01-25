export interface IMenuItem {
	title: string;
	tag: string;
	rutaImagen?: string;
	funcion: () => void;
}
