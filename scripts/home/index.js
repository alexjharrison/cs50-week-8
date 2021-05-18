fetch("https://randomuser.me/api/?nat=us&inc=name,location,picture&results=3")
  .then((res) => res.json())
  .then(({ results }) => {
    const users = results.map((user) => ({
      name: `${user.name.first} ${user.name.last}`,
      address: `${user.location.city}, ${user.location.state}`,
      picture: user.picture.large,
    }));
    console.log(users);
  });
