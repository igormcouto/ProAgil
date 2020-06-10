using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.API.Dto
{
    public class EventoDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage="O campo {0} é obrigatório")]
        [StringLength(50,MinimumLength = 4,ErrorMessage="O campo {0} deve conter entre 4 e 50 caracteres.")]
        public string Local { get; set; }

        [Required(ErrorMessage="O campo {0} é obrigatório")]
        public string DataEvento { get; set; }

        [Required(ErrorMessage="O campo {0} é obrigatório")]
        [StringLength(50,MinimumLength = 4,ErrorMessage="O campo {0} deve conter entre 4 e 50 caracteres.")]
        public string Tema { get; set; }

        [Required(ErrorMessage="O campo {0} é obrigatório")]
        [Range(2,1000000,ErrorMessage="O campo {0} deve conter entre 2 e 1000000 pessoas.")]
        public int QtdPessoas { get; set; }
        public string ImagemUrl { get; set; }

        [Required(ErrorMessage="O campo {0} é obrigatório!")]
        [Phone(ErrorMessage="Informe um telefone válido.")]
        public string Telefone { get; set; }
        
        [Required(ErrorMessage="O campo {0} é obrigatório")]
        [EmailAddress(ErrorMessage="Informe um e-mail válido.")]
        public string Email { get; set; }
        public List<LoteDto> Lotes { get; set; }
        public List<RedeSocialDto> RedesSociais { get; set; }
        public List<PalestranteDto> PalestranteEventos { get; set; }
    }
}