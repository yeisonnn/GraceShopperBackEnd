const createUserAddress = async ({
    address,
    city,
    state,
    postal_code,
    country,
    telefone,
    mobile

  }) => {
    try {
      const { rows } = await client.query(
        `INSERT INTO user_address(
            address,
            city,
            state,
            postal_code,
            country,
            telefone,
            mobile) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [  address,
            city,
            state,
            postal_code,
            country,
            telefone,
            mobile]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  };

  async function canEditUserAddress(id, user_id) {
    try {
      const {
        rows: [user_address],
      } = await client.query(
        `
   SELECT * FROM user_address
   JOIN users ON user_address."user_id" = user_id
   AND user_address.id = $1;
  
   
   `,
        [id]
      );
      return user_address.user_id === user_id;
    } catch (error) {
      throw error;
    }
  }
  
  async function updateUserAddress({ id, ...fields }) {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");
  
    // return early if this is called without fields
    if (setString.length === 0) {
      return;
    }
    try {
      const {
        rows: [user_address],
      } = await client.query(
        `
         UPDATE user_address
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
      `,
        Object.values(fields)
      );
      return user_address;
    } catch (error) {
      throw error;
    }
  }


  module.exports = {
    createUserAddress,
    canEditUserAddress,
    updateUserAddress
  };