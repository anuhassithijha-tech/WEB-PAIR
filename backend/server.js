const {
            return res.json({
                status: false,
                message: 'Number is required'
            });
        }

        const cleanNumber = number.replace(/[^0-9]/g, '');

        const id = Date.now().toString();

        const code = await startSession(id, cleanNumber);

        res.json({
            status: true,
            id,
            number: cleanNumber,
            code
        });

    } catch (e) {

        console.log(e);

        res.json({
            status: false,
            error: e.message
        });
    }
});

app.get('/status/:id', async (req, res) => {

    const id = req.params.id;

    if (!sessions[id]) {
        return res.json({
            status: false,
            connected: false
        });
    }

    const sock = sessions[id];

    const connected = sock.user ? true : false;

    res.json({
        status: true,
        connected,
        user: sock.user || null
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
