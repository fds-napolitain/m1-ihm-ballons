/**
 * Classe bulle construite sur un canvas et affichage avec toString()
 */
class Bulle {

	x; // horizontal
	y; // vertical
	r; // rayon
	color; // couleur
	palette; // palette used
	v = 1; // velocité

	/**
	 * Constructeur d'une bulle sur canvas: voir format dans bulles.json
	 * @param x position sur l'axe horizontal
	 * @param y position sur l'axe vertical
	 * @param r rayon
	 * @param c couleur
	 */
	constructor(x, y, r, c) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.color = c;
		this.setColorsRGB();
		this.draw();
	}

	/**
	 *  Méthode qui dessine
	 */
	draw() {
		context.beginPath();
		context.arc(this.x, this.y, this.r, 0, 2*Math.PI);
		context.lineWidth = 3;
		context.fillStyle = this.palette;
		context.fill();
		context.closePath();
	}

	/**
	 * Une première stratégie rudimentaire pour commencer (rgb)
	 */
	setColorsRGB() {
		let r = this.color % 256;
		let g = 0;
		let b = 0;
		this.palette = "rgb(" + r + "," + g + "," + b + ")";
	}

	/**
	 * hsla
	 */
	setColorsHSLA(to = 0) {
		let h = (this.color + to) % 360;
		let s = "60%";
		let l = "60%";
		let a = 1;
		this.palette = "hsla(" + h + "," + s + "," + l + "," + a + ")";
	}

	/**
	 * Couleurs dégradés
	 * @param to vers la couleur
	 * @returns {CanvasGradient}
	 */
	setColorsDegrade(to) {
		let fromColor = this.setColorsHSLA();
		let toColor = this.setColorsHSLA(to);
		let gradient = context.createLinearGradient(this.x, 0, this.x+this.r*2, 600);
		gradient.addColorStop(0, fromColor);
		gradient.addColorStop(1, toColor);
		this.palette = gradient;
	}

	/**
	 * Redessine la bulle
	 */
	monte() {
		this.v += Math.random() >= 5/6 ? 0.1 : 0; // on lance un dé, si on fait 6, velocité augmente
		this.y -= this.v; // on monte de v=vélocité
		this.draw();
	}

	/**
	 * Affichage dans la console d'une bulle et ses valeurs
	 */
	toString() {
		console.log("bulle: x=" + this.x + " y=" + this.y + " r" + this.r);
	}

}
