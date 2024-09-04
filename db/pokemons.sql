create table if not exists pokemons (
	id serial primary key,
	imagem text NOT null,
	nome_pokemon varchar(20) NOT null,
	elemento text[] NOT null
)