export {};

// Create a type for the roles
export type Roles = "admin" | "landlord" | "tenant";

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            role?: Roles;
        };
    }
}
