import objectAssign from "object-assign";

import github from "./github";
import { GREEN_COLORS } from "./colors";
import { LINE_CONFIG } from "./components/chart_config";

const getStarDatasets = repos => {
  return {
    type: "bar",
    label: "stars",
    data: github.getReposStars(repos),
    backgroundColor: GREEN_COLORS[2],
    borderColor: GREEN_COLORS[0],
    borderWidth: 1
  };
};

const getForkDatasets = repos => {
  return {
    type: "bar",
    label: "forks",
    data: github.getReposForks(repos),
    backgroundColor: GREEN_COLORS[3],
    borderColor: GREEN_COLORS[1],
    borderWidth: 1
  };
};

const getCommitDatasets = (repos, commits) => {
  return objectAssign({}, LINE_CONFIG, {
    type: "line",
    label: "commits",
    data: github.getReposCommits(repos, commits)
  });
};

const doughnutDatasets = (
  datas,
  backgroundColor = [...GREEN_COLORS].slice(0)
) => {
  return {
    type: "doughnut",
    data: datas,
    label: "",
    backgroundColor,
    borderWidth: 2
  };
};

const polarAreaDatasets = datas => {
  return {
    type: "polarArea",
    data: datas,
    label: "",
    backgroundColor: [...GREEN_COLORS].slice(1).reverse(),
    borderWidth: 2
  };
};

const radarDatasets = datas => {
  return {
    type: "radar",
    data: datas,
    label: "",
    fill: true,
    backgroundColor: GREEN_COLORS[4],
    borderWidth: 2,
    borderColor: GREEN_COLORS[0],
    pointBackgroundColor: GREEN_COLORS[0],
    pointBorderColor: "#fff",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: GREEN_COLORS[0]
  };
};

export default {
  repos: {
    starsDatasets: getStarDatasets,
    forksDatasets: getForkDatasets,
    commitsDatasets: getCommitDatasets
  },
  polarArea: polarAreaDatasets,
  radar: radarDatasets,
  doughnut: doughnutDatasets
};
