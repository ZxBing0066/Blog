// fix-frontmatter.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 博客文章目录
const contentDir = path.join(process.cwd(), 'src/content/blog');
const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));

// 计数器
let processed = 0;
let errors = 0;

console.log(`找到 ${files.length} 篇文章需要处理...\n`);

files.forEach(file => {
  try {
    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: markdown } = matter(content);
    
    // 从文章内容中提取 H1 标题
    let title = '';
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1].trim();
    } else {
      // 没有找到 H1 标题，使用文件名作为标题
      title = path.basename(file, '.md')
        .replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '') // 移除日期前缀
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    // 处理日期字段
    let pubDate;
    if (frontmatter.date) {
      // 将各种日期格式转换为 YYYY-MM-DD
      pubDate = formatDate(frontmatter.date);
    } else {
      // 没有日期，尝试从文件名中提取
      const dateMatch = file.match(/^(\d{4}-\d{1,2}-\d{1,2})/);
      pubDate = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];
    }
    
    // 创建新的 frontmatter - 使用条件添加可能为undefined的字段
    const newFrontmatter = {
      title: title || `文章: ${file}`, // 确保标题不为空
      description: frontmatter.summary || frontmatter.description || '', // 使用 summary 或 description
      pubDate: pubDate,
      // 只有在 lastUpdate 存在且可以正确格式化时才添加 updatedDate
      ...(frontmatter.lastUpdate ? { updatedDate: formatDate(frontmatter.lastUpdate) } : {}),
      // 只有在 cover 或 heroImage 存在时才添加 heroImage
      ...(frontmatter.cover || frontmatter.heroImage ? { heroImage: frontmatter.cover || frontmatter.heroImage } : {}),
      tags: frontmatter.tags || []
    };
    
    // 确保 description 不为空
    if (!newFrontmatter.description) {
      // 从内容中提取前100个字符作为描述
      const plainText = markdown.replace(/^#.*$/gm, '').replace(/[#*`_]/g, '').trim();
      newFrontmatter.description = plainText.substring(0, 100) + (plainText.length > 100 ? '...' : '');
    }
    
    // 确保 tags 是数组
    if (typeof newFrontmatter.tags === 'string') {
      newFrontmatter.tags = newFrontmatter.tags.split(/[\s,]+/).filter(Boolean);
    }
    
    // 重写文件
    const newContent = matter.stringify(markdown, newFrontmatter);
    fs.writeFileSync(filePath, newContent);
    
    console.log(`✅ 已处理: ${file}`);
    console.log(`   标题: ${newFrontmatter.title}`);
    console.log(`   日期: ${newFrontmatter.pubDate}`);
    console.log(`   标签: ${Array.isArray(newFrontmatter.tags) ? newFrontmatter.tags.join(', ') : newFrontmatter.tags}`);
    console.log('');
    
    processed++;
  } catch (error) {
    console.error(`❌ 处理 ${file} 时出错:`, error);
    errors++;
  }
});

console.log(`\n处理完成! 成功: ${processed}, 失败: ${errors}`);

// 将各种日期格式转换为 YYYY-MM-DD
function formatDate(dateStr) {
  if (!dateStr) return new Date().toISOString().split('T')[0];
  
  let date;
  if (dateStr instanceof Date) {
    date = dateStr;
  } else if (typeof dateStr === 'string') {
    // 处理格式为 YYYY-MM-DD 或 YYYY-M-D 或 YYYY.MM.DD 或 YYYY.M.D
    dateStr = dateStr.replace(/\./g, '-');
    
    // 处理带时间的日期格式
    const dateOnly = dateStr.split(' ')[0].split('T')[0];
    
    // 确保月份和日期是两位数
    const parts = dateOnly.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const month = parts[1].padStart(2, '0');
      const day = parts[2].padStart(2, '0');
      dateStr = `${year}-${month}-${day}`;
    }
    
    date = new Date(dateStr);
  } else {
    date = new Date();
  }
  
  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    console.warn(`警告: 无效的日期: ${dateStr}, 使用当前日期代替`);
    date = new Date();
  }
  
  // 返回 YYYY-MM-DD 格式
  return date.toISOString().split('T')[0];
}