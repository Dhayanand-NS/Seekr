namespace WebApplication1.Models.DTO
{
    public class LostandFoundDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid Type { get; set; } // Lost or Found
        public string ImageURL { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Location { get; set; }
        public DateTime DatePosted { get; set; }
        public string ContactInfo { get; set; }
    }
}
