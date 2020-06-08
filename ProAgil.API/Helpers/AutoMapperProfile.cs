using AutoMapper;
using ProAgil.API.Dto;
using ProAgil.Domain;

namespace ProAgil.API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Evento,EventoDto>();
            CreateMap<Palestrante,PalestranteDto>();
            CreateMap<Lote,LoteDto>();
            CreateMap<RedeSocial,RedeSocialDto>();
        }
    }
}