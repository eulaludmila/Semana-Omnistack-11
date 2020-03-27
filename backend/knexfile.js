// Update with your config settings.

module.exports = {

  //ambiente de desenvolvimento
  development: {
    client: 'sqlite3',
    connection: {
      //arquivo que irá armazenar dados da base
      filename: './src/database/db.sqlite'
    },

    //localizar onde estão as migrations
    migrations: {
      directory: './src/database/migrations'
    },

    //Para que o valor padrão dos campos no bd sejam nullos
    useNullAsDefault: true,
  },

  test: {
    client: 'sqlite3',
    connection: {
      //arquivo que irá armazenar dados da base
      filename: './src/database/test.sqlite'
    },

    //localizar onde estão as migrations
    migrations: {
      directory: './src/database/migrations'
    },

    //Para que o valor padrão dos campos no bd sejam nullos
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  //ambiente de produção
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
