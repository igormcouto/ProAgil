using System.Linq;
using AutoMapper;
using ProAgil.API.Dto;
using ProAgil.Domain;

namespace ProAgil.API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Evento,EventoDto>()
                    .ForMember(dest => dest.PalestranteEventos, opt => {
                        opt.MapFrom(src => src.PalestranteEventos.Select(x => x.Palestrante).ToList());
                    }).ReverseMap();
            ;

            CreateMap<Palestrante,PalestranteDto>()
                    .ForMember(dest => dest.Eventos, opt => {
                        opt.MapFrom(src => src.PalestranteEventos.Select(x => x.Evento).ToList());
                    }).ReverseMap();
            ;

            CreateMap<Lote,LoteDto>().ReverseMap();
            CreateMap<RedeSocial,RedeSocialDto>().ReverseMap();
        }
    }
}