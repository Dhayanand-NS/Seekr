export interface LostFound{
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
    status : string,
    claimedby : string
}