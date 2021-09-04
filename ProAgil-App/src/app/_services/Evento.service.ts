import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../_models/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  baseURL = 'http://localhost:5000/api/evento';
  tokenHeader: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.tokenHeader = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('token')}`});
  }

  getAllEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseURL,{headers: this.tokenHeader});
  }

  getEventosByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/getByTema/${tema}`);
  }

  getEventosById(id: number): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/${id}`);
  }

  postEvento(evento: Evento) {
    return this.http.post(this.baseURL, evento);
  }

  postUpload(file: File, name: string){
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, name);

    return this.http.post(`${this.baseURL}/upload`, formData,{headers: this.tokenHeader});
  }

  putEvento(evento: Evento) {
    return this.http.put(`${this.baseURL}/${evento.id}`, evento, {headers: this.tokenHeader});
  }

  deleteEvento(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
