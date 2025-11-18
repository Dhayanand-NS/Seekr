export interface Submissions{
    title : string,
    description:string,
    type:string,
    imageURL : string,
    latitude? : number,
    longitude?: number,
    location:string,
    date : Date;
    contactinfo: string,
    radius : number,
    isMatched : boolean,
    MatchedID : string
}