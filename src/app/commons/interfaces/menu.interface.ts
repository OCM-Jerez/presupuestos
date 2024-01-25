export interface IMenuItem {
	title: string;
	path?: string;
	tag: string;
	isLastLevel?: boolean;
	rutaImagen?: string;
	funcion: () => void;
}
