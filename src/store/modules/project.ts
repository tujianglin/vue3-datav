import { defineStore } from 'pinia';
import { getProject } from '/@/api/project';
import { ProjectGroup } from '/@/api/models/project';

interface ProjectState {
  groups: ProjectGroup[];
}
export const useProjectStore = defineStore('project', {
  state: (): ProjectState => ({
    groups: [],
  }),
  actions: {
    async getProjectGroup() {
      const res = await getProject();
      const list = res.flatMap((i) => i.children);
      const allGroups = new ProjectGroup(-1, '全部应用', list);
      this.groups = [allGroups, ...res];
    },
  },
});
