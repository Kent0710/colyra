export interface AccountTableSchema {
    id : string;
    username : string;
    auth_user_id : string;
}

export interface SpaceTableSchema {
    id: string;
    name: string;
    user_id: string;
}

export interface ResourceTableSchema {
    id: string;
    link: string; 
    name: string;
    user_id: string;
    uploaded_on: Date;
    space_id: string;
    type: 'link' | 'file';
}

export interface MessageTableSchema {
    id : string;
    content : string;
    user_id : string;
    space_id : string;
}

export interface UserSpaceTableSchema {
    account_id : string;
    space_id : string;
    isApproved : boolean;
    isOwner : boolean;
}