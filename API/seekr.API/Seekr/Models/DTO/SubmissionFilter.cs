namespace Seekr.Models.DTO
{
    public class SubmissionFilter
    {
        public string? Type { get; set; }
        public string? MatchFound { get; set; }
        public DateTime Date { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
