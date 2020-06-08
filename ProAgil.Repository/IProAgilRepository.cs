using System.Threading.Tasks;
using ProAgil.Domain;

namespace ProAgil.Repository
{
    public interface IProAgilRepository
    {
         void Add<T>(T entity) where T : class;
         void Update<T>(T entity) where T : class;
         void Delete<T>(T entity) where T : class;
         Task <bool> SaveChangesAsync();

         //EVENTOS
         Task<Evento[]> GetEventoAsyncByTema (string tema, bool includePalestrante);
         Task<Evento[]> GetAllEventoAsync (bool includePalestrante);
         Task<Evento> GetEventoAsyncId (int EventoId, bool includePalestrante);

         //PALESTRANTES
         Task<Palestrante[]> GetAllPalestrantesAsyncByName (string name, bool includeEventos);
         Task<Palestrante> GetPalestranteAsync (int PalestranteId, bool includeEventos);
         Task<Palestrante[]> GetAllPalestrantesAsync (bool includeEventos);
    }
}