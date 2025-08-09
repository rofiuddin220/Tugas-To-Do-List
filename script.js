document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const filterBtn = document.getElementById('filter-btn');
    const filterDateInput = document.getElementById('filter-date');
    const validationMessage = document.getElementById('validation-message');

    // Array untuk menyimpan semua tugas
    let tasks = [];

    // Fungsi untuk menampilkan tugas
    function renderTasks(filteredTasks = tasks) {
        taskList.innerHTML = '';
        if (filteredTasks.length === 0) {
            taskList.innerHTML = '<tr><td colspan="3">Tidak ada tugas.</td></tr>';
            return;
        }

        filteredTasks.forEach((task, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.name}</td>
                <td>${task.date}</td>
                <td>
                    <button class="delete-task-btn" data-index="${index}">Hapus</button>
                </td>
            `;
            taskList.appendChild(row);
        });
    }

    // Fungsi untuk menambah tugas
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskNameInput = document.getElementById('task-name');
        const taskDateInput = document.getElementById('task-date');
        
        // Validasi Formulir Input
        if (taskNameInput.value.trim() === '' || taskDateInput.value.trim() === '') {
            validationMessage.textContent = 'Nama tugas dan tanggal tidak boleh kosong!';
            return;
        } else {
            validationMessage.textContent = '';
        }

        const newTask = {
            name: taskNameInput.value,
            date: taskDateInput.value
        };

        tasks.push(newTask);
        renderTasks();
        taskForm.reset();
    });

    // Fungsi untuk menghapus tugas individu
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-task-btn')) {
            const index = e.target.getAttribute('data-index');
            tasks.splice(index, 1);
            renderTasks();
        }
    });

    // Fungsi untuk menghapus semua tugas
    clearAllBtn.addEventListener('click', () => {
        tasks = [];
        renderTasks();
    });

    // Fungsi untuk memfilter tugas berdasarkan tanggal
    filterBtn.addEventListener('click', () => {
        const filterDate = filterDateInput.value;
        if (filterDate) {
            const filtered = tasks.filter(task => task.date === filterDate);
            renderTasks(filtered);
        } else {
            renderTasks(); // Tampilkan semua jika tanggal filter kosong
        }
    });

    // Inisialisasi tampilan awal
    renderTasks();
});
