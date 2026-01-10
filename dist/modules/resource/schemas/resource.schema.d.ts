import type { HydratedDocument } from "mongoose";
export type ResourceDocument = HydratedDocument<Resource>;
export declare class Resource {
    title: string;
    description: string;
    content: string;
    imageUrl: string;
    type: string;
    category: string;
    duration: string;
    viewCount: number;
    isPublished: boolean;
    publishedAt: Date;
}
export declare const ResourceSchema: import("mongoose").Schema<Resource, import("mongoose").Model<Resource, any, any, any, import("mongoose").Document<unknown, any, Resource, any, import("mongoose").DefaultSchemaOptions> & Resource & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any, Resource>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Resource, import("mongoose").Document<unknown, {}, Resource, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Resource & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Resource, import("mongoose").Document<unknown, {}, Resource, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Resource & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    description?: import("mongoose").SchemaDefinitionProperty<string, Resource, import("mongoose").Document<unknown, {}, Resource, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Resource & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    content?: import("mongoose").SchemaDefinitionProperty<string, Resource, import("mongoose").Document<unknown, {}, Resource, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Resource & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    imageUrl?: import("mongoose").SchemaDefinitionProperty<string, Resource, import("mongoose").Document<unknown, {}, Resource, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Resource & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    type?: import("mongoose").SchemaDefinitionProperty<string, Resource, import("mongoose").Document<unknown, {}, Resource, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Resource & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    category?: import("mongoose").SchemaDefinitionProperty<string, Resource, import("mongoose").Document<unknown, {}, Resource, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Resource & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    duration?: import("mongoose").SchemaDefinitionProperty<string, Resource, import("mongoose").Document<unknown, {}, Resource, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Resource & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    viewCount?: import("mongoose").SchemaDefinitionProperty<number, Resource, import("mongoose").Document<unknown, {}, Resource, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Resource & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    isPublished?: import("mongoose").SchemaDefinitionProperty<boolean, Resource, import("mongoose").Document<unknown, {}, Resource, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Resource & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    publishedAt?: import("mongoose").SchemaDefinitionProperty<Date, Resource, import("mongoose").Document<unknown, {}, Resource, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Resource & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, Resource>;
