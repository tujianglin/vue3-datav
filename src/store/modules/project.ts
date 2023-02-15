import { defineStore } from 'pinia';
import { getProject, postProject, delProject } from '/@/api/project';
import { ProjectGroup } from '/@/api/models/project';

interface ProjectState {
  allGroups: ProjectGroup[];
}
export const useProjectStore = defineStore('project', {
  state: (): ProjectState => ({
    /* 分组数据 */
    allGroups: [],
  }),
  getters: {
    group(state) {
      const list = state.allGroups.flatMap((i) => i.children);
      return new ProjectGroup(-1, '全部应用', list);
    },
  },
  actions: {
    /* 获取分组 */
    async getProjectGroup() {
      const res = await getProject();
      this.allGroups = res;
    },
    /* 添加分组 */
    async addProjectGroup(data) {
      const res = await postProject(data);
      const newGroup = new ProjectGroup(res, data.name, []);
      this.allGroups.unshift(newGroup);
    },
    /* 删除分组 */
    async delProjectGroup(data) {
      await delProject(data);
      const index = this.allGroups.findIndex((i) => i.id === data.id);
      this.allGroups.splice(index, 1);
    },
  },
});
