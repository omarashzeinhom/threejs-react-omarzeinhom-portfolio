const skills = {
    // We name our schema
    name: "skills", // name is the key id for everything
    title: "Skills",
    type: "document",
    fields: [
      //All Objects
      {
        //Name
        name: "name", //key
        title: "Name",
        type: "string",
      },
      {
        //Description
        name: "description", //key
        title: "Description",
        type: "string",
      },
  
      {
        //Icon
        name: "icon", //key
        title: "Icon",
        type: "image",
        options: {
          //crop hotspot check sanity docs  [Presenting Images](https://www.sanity.io/docs/presenting-images)
          hotspot: true,
        },
      },
      
      {
        //Categories
        name: "categories", //key
        title: "Categories",
        type: "array",
        of: [
          {
            name: "category",
            title: "Category",
            type: "string",
          },
        ],
      },
    ],
  };
  
  export default skills;