# DESCRIBE SYSTEM CONFIG
CONFIGURE INSTANCE SET session_idle_transaction_timeout := <std::duration>'PT10S';

# DESCRIBE ROLES
ALTER ROLE edgedb { SET password_hash := 'SCRAM-SHA-256$4096:83ZooqGGCZpr3dmx5KipJQ==$MI2kKUP8hBA0AYNVdW7ehxIwroFaW+avFCkLFTkkRfw=:ZLPA//Cyrqgvw5zglO4+6UFJH6scc07+Hms4o4iYDoA=';};
