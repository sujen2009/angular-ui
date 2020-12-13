import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})

export class AuthService {
	private serverPort = environment.SERVER_PORT;

	constructor(private http: HttpClient) { }

	register(user: any) {
		return this.http.post(`http://localhost:${this.serverPort}/register`, user);
	}

	isUnique(field: string, data: string) {
		return this.http.post(`http://localhost:${this.serverPort}/checkunique`, { field: field, data: data });
	}

	login(user: any) {
		return this.http.post<any>(`http://localhost:${this.serverPort}/login`, user).pipe(
			map((data) => {
				localStorage.setItem('user', JSON.stringify({ 'id': data.id, 'name': data.name, 'access_token': data.token }));
				localStorage.setItem('userObj', JSON.stringify({'user': data}));
				return data;
			})
		);
	}
}
