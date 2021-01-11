type DataId = number;
type Data = {
  stuff: string;
  thing: number;
};

async function getData (dataId: DataId): Promise<Data> {
  const resource = new URL(`https://www.google.com/}`);
  let response;
  try {
    response = await fetch(resource.toString());
    console.log("ff", response)
    response = {
      data: {stuff: `${dataId}: Data From External Resource`}
    };
  } catch (error) {
    // if (error.response && error.response.status === 404) {
    //   throw new ErrorPipelineMissing(`Pipeline ${pipelineId} does not exist`);
    // }
    throw error;
  }
  const data = {
    ...response.data,
    thing: dataId
  };
  return data;
}

async function getDatas (limit: number): Promise<Array<Data>> {
  const result: Data[] = []
  for (let i = 1; i <= limit; i++) {
    const response = {
      stuff: `${i}: Data From External Resource`,
      thing: i
    }
    result.push(response)
  }
  return result;
}


export type {
  DataId,
  Data
};

export {
  getData,
  getDatas
};
