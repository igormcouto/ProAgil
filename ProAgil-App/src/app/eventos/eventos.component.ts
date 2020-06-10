import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/Evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ToastrService } from 'ngx-toastr';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventosFiltrados: Evento[];
  eventos: Evento[];
  evento: Evento;
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  modalRef: BsModalRef;
  registerForm: FormGroup;
  modoSalvar: string;
  bodyDeletarEvento = '';

  constructor(
               private eventoService: EventoService
             , private modalService: BsModalService
             , private fb: FormBuilder
             , private localeService: BsLocaleService
             , private toastr: ToastrService
    ) {
      this.localeService.use('pt-br');
     }

  filtroListaProp: string;
  get filtroLista(): string {
  return this.filtroListaProp;
  }
  set filtroLista(value: string) {
    this.filtroListaProp = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  filtroListaLocalProp: string;
  get filtroListaLocal(): string {
    return this.filtroListaLocalProp;
    }
    set filtroListaLocal(value: string) {
      this.filtroListaLocalProp = value;
      this.eventosFiltrados = this.filtroListaLocal ? this.filtrarLocal(this.filtroListaLocal) : this.eventos;
    }

    openModalSave(template: any) {
      this.modoSalvar = 'post';
      this.openModal(template);
    }

    openModal(template: any) {
      this.registerForm.reset();
      template.show();
    }

    openModalEdit(evento: Evento, template: any) {
      this.modoSalvar = 'put';
      this.openModal(template);
      this.evento =  evento;
      this.registerForm.patchValue(evento);
    }

    novoEvento(template: any) {
      this.openModal(template);
    }

  ngOnInit() {
    this.validation();
    this.getEventos();
  }

  filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  filtrarLocal(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  validation() {
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', [Validators.required, Validators.minLength(4)]],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(1000000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemUrl: ['', Validators.required]
    });
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.evento = Object.assign({}, this.registerForm.value);
        this.eventoService.postEvento(this.evento).subscribe(
          (novoEvento: Evento) => {
            template.hide();
            this.getEventos();
          }, error => {
            console.log(error);
          }
        );
      } else if (this.modoSalvar === 'put') {
        this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
        this.eventoService.putEvento(this.evento).subscribe(
          () => {
            template.hide();
            this.getEventos();
          }, error => {
            console.log(error);
          }
        );
      }
    }
  }

  getEventos() {
    this.eventoService.getAllEventos().subscribe(
    // tslint:disable-next-line:variable-name
    (_eventos: Evento[]) => {
     this.eventos = _eventos,
     this.eventosFiltrados = this.eventos,
     console.log(_eventos);
    }, error => {
      console.log(error);
    });
  }

  getEventosId(id: number) {
    this.eventoService.getEventosById(id).subscribe(
      // tslint:disable-next-line:variable-name
      (_eventos: Evento[]) => {
       this.eventos = _eventos,
       this.eventosFiltrados = this.eventos,
       console.log(_eventos);
      }, error => {
        console.log(error);
      });
  }

  excluirEvento(evento: Evento, template: any) {
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
  }

  confirmeDelete(template: any) {
    this.eventoService.deleteEvento(this.evento.id).subscribe(
      () => {
          template.hide();
          this.getEventos();
          this.toastr.success('Hello world!', 'Toastr fun!');
        }, error => {
          console.log(error);
        }
    );
  }
}
