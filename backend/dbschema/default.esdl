module default {
scalar type Role extending enum<admin, user>;

    abstract type HasTimeStamp{
        created: datetime{
            default := datetime_of_statement()
        }
    }

    type Session {
        required token: uuid {
            default := std::uuid_generate_v4();
            constraint exclusive
        }
        required expired: datetime {
            default := datetime_of_statement()+ <cal::date_duration>'7 days';
        }
    }

    type User extending Session{
        required email: str{
            constraint exclusive
        }
        required password: str;
        required role: Role{
            default := 'admin'
        }
        session: Session;
        created: datetime{
            default := datetime_of_statement()
        }
        personalData: UserPersonalData
    }

    type UserPersonalData {
        required name: str;
        required phone: str;
        required country: str;
        required zipCode: str;
        required city: str;
        required addres: str;
        other: str;
    }
}
