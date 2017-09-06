import Resume from './schema';
import { DEFAULT_RESUME } from '../../utils/datas';

const initialResume = async (userId, options) => {
  const newResume = Object.assign({}, DEFAULT_RESUME);
  newResume.info.name = options.name || '';
  newResume.info.email = options.email || '';
  return await addResume(userId, newResume);
};

const findResume = async (options) => {
  return await Resume.findOne(options);
};

const addResume = async (userId, resume = DEFAULT_RESUME) => {
  const addResult = await Resume.create({
    userId,
    resume
  });
  return Promise.resolve({
    success: addResult ? true : false,
    message: 'New resume added!',
    result: addResult || null
  });
};

const updateResume = async (userId, resume) => {
  await Resume.remove({ userId });
  return await addResume(userId, resume);
};

const getUpdateTime = async (userId) => {
  const getResult = await findResume({ userId });
  return Promise.resolve({
    success: getResult ? true : false,
    message: '',
    result: getResult ? getResult.updated_at : ''
  });
};

const getResume = async (userId) => {
  const getResult = await findResume({ userId });
  if (!getResult) {
    return Promise.resolve({
      success: false,
      message: 'There was an error. Check your GitHub link.',
      result: null
    });
  }
  const { resume, updated_at } = getResult;
  const {
    info,
    others,
    educations,
    workExperiences,
    personalProjects
  } = resume;
  return Promise.resolve({
    success: true,
    message: '',
    result: {
      info,
      others,
      educations,
      workExperiences,
      personalProjects,
      updateAt: updated_at
    }
  });
};

const removeAll = async () => {
  await Resume.remove();
};

export default {
  initialResume,
  addResume,
  getResume,
  getUpdateTime,
  updateResume,
  removeAll
}
