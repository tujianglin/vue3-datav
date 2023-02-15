import { defineStore } from 'pinia';
import { getProject, postProject } from '/@/api/project';
import { ProjectGroup } from '/@/api/models/project';

interface ProjectState {
  groups: ProjectGroup[];
}
export const useProjectStore = defineStore('project', {
  state: (): ProjectState => ({
    /* 分组数据 */
    groups: [],
  }),
  actions: {
    /* 获取分组 */
    async getProjectGroup() {
      const res = await getProject();
      const list = res.flatMap((i) => i.children);
      const allGroups = new ProjectGroup(-1, '全部应用', list);
      this.groups = [allGroups, ...res];
    },
    /* 添加分组 */
    async addProjectGroup(data) {
      const res = await postProject(data);
      const newGroup = new ProjectGroup(res, data.name, []);
      this.groups.splice(1, 0, newGroup);
    },
  },
});
