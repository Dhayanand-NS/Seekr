export interface Submissions{
    title : string,
    description:string,
    type:string,
    imageURL : string,
    latitude? : number,
    longitude?: number,
    location:string,
    date : Date;
    contactInfo: string,
    radius : number,
    isMatched : boolean,
    matchedId : string,
    matchedLatitude : number,
    matchedLongitude : number
}