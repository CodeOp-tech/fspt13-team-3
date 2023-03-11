//conect to mysql
const db = require("@/server/helper");

// PATCH request to update an existing user in user_table
export async function updateUserById(req, res) {
  const id = req.query.id;


  try {
    const response = await db(`SELECT * FROM user_table, services WHERE user_table.user_id = services.user_id AND user_table.user_id = ${id}`);
    const user = response.data[0];

    if (!user) {
      res.status(404).send();
    }
    const updatedUser = { ...user, ...req.body };

    await db(
      `UPDATE user_table, services SET username = '${updatedUser.username}', password = '${updatedUser.password}', email = '${updatedUser.email}', avatar = '${updatedUser.avatar}', location = '${updatedUser.location}', firstname = '${updatedUser.firstname}', lastname = '${updatedUser.lastname}', service_type = '${updatedUser.service_type}', service_category = '${updatedUser.category}', description = '${updatedUser.description}', skills = '${updatedUser.skills}', languages = '${updatedUser.languages}', hourly_rate = ${updatedUser.hourly_rate}, resume = '${updatedUser.resume}', github_url = '${updatedUser.github_url}', linkedin_url = '${updatedUser.linkedin_url}', other_url = '${updatedUser.other_url}', images = '${updatedUser.images}' WHERE user_table.user_id = services.user_id AND user_table.user_id = ${id}`
    );

    res
      .status(200)
      .json({ message: `User with id ${id} updated successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
}
