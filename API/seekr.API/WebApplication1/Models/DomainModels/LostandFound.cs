namespace WebApplication1.Models.DomainModels
{
    public class LostandFound
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Type { get; set; } // Lost or Found
        public string ImageURL { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Location { get; set; }
        public DateTime DatePosted { get; set; }
        public string ContactInfo { get; set; }
        public string DateFoundLost { get; set; }

    }
}
