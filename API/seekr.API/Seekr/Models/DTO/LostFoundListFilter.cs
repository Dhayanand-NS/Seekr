namespace Seekr.Models.DTO
{
    public class LostFoundListFilter
    {
        public string? Type { get; set; }
        public string? Item { get; set; }
        public DateTime Date { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
