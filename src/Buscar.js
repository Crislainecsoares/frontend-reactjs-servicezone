import React, { Component } from 'react'
export default class Buscar extends Component {
	constructor(props) {
		super(props)
	}

	search(e) {
		let x;
		const input = e.target.value.toLowerCase() // valor do campo de busca via evento
		if (document.getElementsByClassName('user-item')) {
			x = document.getElementsByClassName('user-item');
		}

		if (input != null) {
			for (let i = 0; i < x.length; i++) {
				if (!x[i].textContent.replace(/\s/g,'').toLowerCase().includes(input)) {
					x[i].style.display = "none";
				}
				else {
					x[i].style.display = "list-item";
				}
			}
		}
	}


	render() {
		return null
	}
}
