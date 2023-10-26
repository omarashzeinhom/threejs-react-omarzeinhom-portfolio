const work = {
    // We name our schema
    name: "work", // name is the key id for everything
    title: "Portofolio items",
    type: "document",
    fields: [
      {
        //objects
        name: "name", //key
        title: "Name",
        type: "string",
      },
      {
        //objects
        name: "description", //key
        title: "Description",
        type: "string",
      },
      {
        //objects
        name: "projectGitHubLink", //key
        title: "Project GitHub Link",
        type: "url",
      },
      {
        //objects
        name: "projectLink", //key
        title: "Project Link",
        type: "url",
      },
      {
        //imageURL
        name: "imgUrl", //key
        title: "Image",
        type: "image",
        options: {
          //crop hotspot check sanity docs  [Presenting Images](https://www.sanity.io/docs/presenting-images)
          hotspot: true,
        },
      },
      {
        name: "categories",
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
  
  export default work;